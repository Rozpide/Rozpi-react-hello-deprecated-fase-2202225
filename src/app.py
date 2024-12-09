import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favorites, Wallet
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_mail import Mail, Message

# Determine environment
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')

# Initialize Flask app first
app = Flask(__name__)
app.url_map.strict_slashes = False

# Enable CORS for frontend-backend communication
CORS(app)

# Configure Flask-Mail (after app initialization)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # For Gmail. Replace with your provider's SMTP
app.config['MAIL_PORT'] = 587  # Use 465 for SSL, 587 for TLS
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Set this in your .env or system variables
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  # Set this in your .env or system variables
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')  # Default sender email address

# Initialize Flask-Mail
mail = Mail(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # Replace with your own secret key
jwt = JWTManager(app)  # Initialize JWT manager

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin panel
setup_admin(app)

# Add custom commands
setup_commands(app)

# Register API routes with the "/api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

# Route for sending emails
@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()

    email = data.get('email')  # Get the email from the frontend form submission
    message = data.get('message')

    if not email or not message:
        return jsonify({'success': False, 'message': 'Email and message are required'}), 400
    
    try:
        # Send the email from the user's email address
        msg = Message(
            subject="New Contact Us Message",
            recipients=[os.getenv('RECIPIENT_EMAIL')],  # The recipient's email address
            body=f"Message from {email}:\n\n{message}",
            sender=email  # The sender's email will be the user's email address
        )
        mail.send(msg)

        return jsonify({'success': True, 'message': 'Email sent successfully!'}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'success': False, 'message': 'Failed to send email.'}), 500
@app.route('/favorites/<coin_id>', methods=['POST'])
def add_fav(coin_id):
@app.route('/favorites/<coin_id>', methods=['POST','DELETE'])
def toggle_fav(coin_id):
    user_id = request.json['user_id']
    name = request.json['name']
    fav_crypto = Favorites(name=name, user_id=user_id, coin_id=coin_id)
    db.session.add(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))
 

@app.route('/favorites/<int:user_id>/<int:favorite_id>', methods=['DELETE'])
def delete_fav(favorite_id, user_id):
    fav_crypto = Favorites.query.get(favorite_id)
    db.session.delete(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))

def get_favs (id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return favorites

@app.route('/users/<int:id>/favorites', methods=['GET']) 
def get_favorites(id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return jsonify(favorites)

# Run the application
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


