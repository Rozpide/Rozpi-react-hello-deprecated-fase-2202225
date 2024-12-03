from flask import Flask, request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User

api = Blueprint('api', __name__)

# Example endpoint: Replace or extend as needed
@api.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello, World!"})

# Register a new user
@api.route('/users', methods=['POST'])
def register_user():
    data = request.get_json()  # Parse JSON from the request

    # Validate input
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 400

    # Create new user
    hashed_password = generate_password_hash(password)  # Hash the password
    new_user = User(email=email, password=hashed_password)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Login a user
@api.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()  # Parse JSON from the request

    # Validate input
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Find user
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful", "user": user.serialize()}), 200

# Example endpoint to retrieve all users
@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

# Placeholder for additional routes
# Add your other endpoints here
@api.route('/example', methods=['GET'])
def example_endpoint():
    return jsonify({"message": "This is an example endpoint!"})
