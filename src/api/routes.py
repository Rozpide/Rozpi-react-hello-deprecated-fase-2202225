"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product, Cart
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# api.config["JWT_SECRET_KEY"] = "txamanguillo"  
# jwt = JWTManager(api)

# Allow CORS requests to this API
CORS(api)

@api.route("signup", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    
    if user is None:
        new_user = User(email=email, password=password, is_active=True)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "usuario creado"}), 200
    return jsonify({"msg": "el usuario ya existe"}), 400
    


@api.route("login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "usuario o email incorrectos"}), 400
    access_token = create_access_token(identity=user.email)
    return jsonify({"token": access_token}), 200


@api.route("profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email = user_email).first()
    if not user:
        return jsonify({"msg": "usuario no encontrado"}), 400
    return jsonify(user.serialize()), 200


@api.route("/profile", methods=["PUT"])
@jwt_required()  
def update_profile():
    user_email = get_jwt_identity()

    user = User.query.filter_by(email=user_email).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    data = request.get_json()

    user.name = data.get("name", user.name)
    user.age = data.get("age", user.age)
    user.location = data.get("location", user.location)
    user.description = data.get("description", user.description)
    user.profile_image = data.get("profileImage", user.profile_image)

    db.session.commit()

    return jsonify({"msg": "Perfil actualizado correctamente"}), 200


@api.route('/shop', methods=['GET'])
def get_products():
    product = Product.query.all()
    serialized_product = list([product.serialize() for product in product])
    print(serialized_product)
    if not product:
        return jsonify({"msg": "no product found"}), 404
    else:
        return jsonify(serialized_product), 200
    

@api.route('/cart', methods=['GET'])
def get_cart():
    cart = Cart.query.all()
    serialized_cart = list([cart.serialize() for cart in cart])
    print(serialized_cart)
    if not cart:
        return jsonify({"msg": "no cart found"}), 404
    else:
        return jsonify(serialized_cart), 200
    

