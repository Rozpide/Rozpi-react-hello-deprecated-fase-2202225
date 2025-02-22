from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

#--------------------AÑADIR O REGISTRAR UN USUARIO--------------------------------------------

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    if not body:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
    if 'email' not in body:
        raise APIException("You need to specify the email", status_code=400)
    if 'password' not in body:
        raise APIException("You need to specify the password", status_code=400)

    user = User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

#---------------------LOGIN OBTENER EL TOKEN--------------------------------------------

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()

    if not body:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
    if 'email' not in body:
        raise APIException("You need to specify the email", status_code=400)
    if 'password' not in body:
        raise APIException("You need to specify the password", status_code=400)

    user = User.query.filter_by(email=body['email']).first()
    if not user or user.password != body['password']:
        raise APIException("Invalid email or password", status_code=401)

    expiration = datetime.timedelta(hours=48)  # Duración de 48 horas
    access_token = create_access_token(identity=str(user.id), expires_delta=expiration)

    return jsonify({"token": access_token}), 200

#--------------------------------------------OBTENER TODOS LOS USUARIOS--------------------------------------------

@api.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    user_list = [
        {
            "id": user.id,
            "email": user.email,
            "is_active": user.is_active,
            "is_admin": user.is_admin,
            "phone": user.phone,
            "address": user.address
        } for user in users
    ]
    return jsonify(user_list), 200
200


#-------------------------------BORRAR UN USUARIO-------------------------------------

@jwt_required()
def delete_user(id):
    user = User.query.get(id)
    
    if not user:
        raise APIException("User not found", status_code=404)
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"message": f"User with id {id} deleted successfully"}), 200
#--------------------------------------------MODIFICAR INFORMACION DE UN USUARIO TODOS LOS CAMPOS-------------------------------------------
@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    current_user_id = get_jwt_identity()
    user = User.query.get(id)

    if not user:
        raise APIException("User not found", status_code=404)

    body = request.get_json()
    if not body:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)

    if 'email' in body:
        user.email = body['email']
    if 'password' in body:
        user.password = body['password']
    if 'is_active' in body:
        user.is_active = body['is_active']
    if 'is_admin' in body:
        user.is_admin = body['is_admin']
    if 'phone' in body:
        user.phone = body['phone']
    if 'address' in body:
        user.address = body['address']

    db.session.commit()
    return jsonify({"message": "User information updated successfully"}), 200

#--------------------------------------------OBTENER INFORMACION DE UN USUARIO--------------------------------------------
@api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get(id)
    if not user:
        raise APIException("User not found", status_code=404)
    return jsonify({
        "id": user.id,
        "email": user.email,
        "is_active": user.is_active,
        "is_admin": user.is_admin,
        "phone": user.phone,
        "address": user.address
    }), 200
    #-------------------------------------CREAR VARIOS USUARIOS A LA VEZ-------------------------------------
@api.route('/users', methods=['POST'])
@jwt_required()
def create_users():
    body = request.get_json()
    if not body:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
    if not isinstance(body, list):
        raise APIException("The request body must be a JSON array", status_code=400)
    
    for user_data in body:
        if 'email' not in user_data or 'password' not in user_data:
            continue
        user = User(email=user_data['email'], password=user_data['password'], is_active=True)
        db.session.add(user)

    db.session.commit()
    return jsonify({"message": "Users created successfully"}), 201
  
#---------------------------MODIFICAR PARCIALMENTE LA INFORMACION DE UN USUARIO--------------------------------
@api.route('/users/<int:id>', methods=['PATCH'])
@jwt_required()
def partial_update_user(id):
    user = User.query.get(id)
    if not user:
        raise APIException("User not found", status_code=404)

    body = request.get_json()
    if not body:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)

    if 'email' in body:
        user.email = body['email']
    if 'password' in body:
        user.password = body['password']
    if 'is_active' in body:
        user.is_active = body['is_active']
    if 'is_admin' in body:
        user.is_admin = body['is_admin']
    if 'phone' in body:
        user.phone = body['phone']
    if 'address' in body:
        user.address = body['address']

    db.session.commit()
    return jsonify({"message": "User information partially updated successfully"}), 200

    
