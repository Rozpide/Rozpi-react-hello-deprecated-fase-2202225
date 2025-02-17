"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Games, Tags, Favourites
from api.utils import generate_sitemap, APIException
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from flask_cors import CORS
import requests
import subprocess
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt()


# Allow CORS requests to this API
CORS(api)#proteccion solo cuando permito


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    data = db.session.scalars(db.select(User)).all()
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# endpoints de juegos
# @api.route("/games", methods=['GET'])
# def get_all_games():
#     data = db.session.scalars(db.select(Games)).all()
#     results = list(map(lambda item: item.serialize(), data))
#     response_body = {
#         "results": results
#     }
#     return jsonify(response_body), 200


@api.route("/games", methods=['GET'])
def get_page_games():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    if per_page > 10:
        per_page = 10
    pagination = Games.query.paginate(page=page, per_page=per_page, error_out=False)
    result_data = {
        "result": [game.serialize() for game in pagination.items]
    }
    # print(result_data[re])
    if len(result_data["result"]) < 1:
        response = jsonify({"Error": "no data in the page"})
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response, 404
    response = jsonify(result_data)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response, 200


@api.route("/games", methods=['POST'])
def post_game():
    request_data = request.json
    name = request_data.get('name')
    tags_id = request_data.get('tags')
    try:
        game = db.session.execute(db.select(Games).filter_by(name=name)).scalar_one()
        if game:
            return jsonify({"msg": "game already exists, did you mean to do a PUT?"}), 400
    except NoResultFound:
        pass
    except MultipleResultsFound:
        return jsonify({"msg": "game already exists, did you mean to do a PUT?"}), 400
    except Exception as e:
        print("Error al intentar postear juego: ", e)
        return jsonify({"msg": "Algo no ha salido como debería"}), 400
    tags = []
    if not isinstance(tags_id, list):
            return jsonify({"error": "tags must be a list"}), 400
    for tag_id in tags_id:
        try:
            db.session.execute(db.select(Tags).filter_by(steam_id=tag_id)).scalar_one()
        except NoResultFound:
            print(f"tag_id not found in database {tag_id}")
        except:
            pass  
    try:
        tags = db.session.scalars(db.select(Tags).filter(Tags.steam_id.in_(tags_id))).all()
        print(tags)
    except Exception as e:
        print("Error al intentar postear juego: ", e)
        pass
    result = Games(
        name = request_data.get('name'),
        app_id = request_data.get('appId'),
        release = request_data.get('release'),
        image_id = request_data.get('imageID'),
        score = request_data.get('score'),
        g2a_price = request_data.get('g2aPrice'),
        g2a_url = request_data.get('g2aUrl'),
        steam_price = request_data.get('steamPrice'),
        game_tags = tags
    )
    db.session.add(result)
    db.session.commit()
    return jsonify(result.serialize()), 201


# endpoints de tags
@api.route("/tags", methods=['GET'])
def get_all_tags():
    data = db.session.scalars(db.select(Tags)).all()
    results = list(map(lambda item: item.serialize(), data))
    if len(results) < 1:
        return jsonify({"msg": "No available tags"}), 200
    response_body = {
        "results": results
    }
    return jsonify(response_body), 200


@api.route("/tags", methods=['POST'])
def post_tag():
    request_data=request.json
    tags = request_data.get("tags")
    if not isinstance(tags, list):
            return jsonify({"error": "tags must be a list"}), 400
    added_tags = []
    for tag in tags:
        try:
            if not isinstance(tag[0], str):
                return jsonify({"error": "The first value of each array needs to be a string"}), 400
            if str(tag[0]).isnumeric():
                return jsonify({"error": "The first value of each array can not be a number"}), 400
            tag_name = db.session.execute(db.select(Tags).filter_by(tag_name=tag[0])).scalar_one()
            if tag_name:
                return jsonify({"msg": f"tag with same name already exists {tag_name.tag_serialize()}"}), 400
        except NoResultFound:
            pass
        try:
            if not str(tag[1]).isnumeric():
                return jsonify({"error": "The second value of each array needs to be a number"}), 400
            tag_steam_id = db.session.execute(db.select(Tags).filter_by(steam_id=tag[1])).scalar_one()
            if tag_steam_id:
                return({"msg": f"tag with same steam_id already exists {tag_steam_id.tag_serialize()}"}), 400
        except NoResultFound:
            pass

        new_tag = Tags(
            tag_name = tag[0],
            steam_id = tag[1]
        )
        added_tags.append(new_tag.tag_serialize())
        print(new_tag.tag_serialize())
        db.session.add(new_tag)
        db.session.commit()
        
    return jsonify({"Added tags": added_tags})

def fetch_steam_data(appId):
    url = f"https://store.steampowered.com/api/appdetails?appids={appId}"
    response = requests.get(url)  
    if response.status_code == 200:
        return response.json()
    return None

@api.route('/steam/<int:appId>', methods=['GET'])
def get_steam_data(appId):
    data = fetch_steam_data(appId)
    
    if data:
        response = jsonify(data)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        print("Sending response...")
        return response
    else:
        print("Failed to fetch data from Steam API")
        return jsonify({"error": "Failed to fetch data from Steam API"}), 500
    
# @api.route('/games', methods=['PUT'])
# def change_all_game_data():


#registro 
@api.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Faltan datos"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "El usuario ya existe"}), 400

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201



#login
@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user": user.serialize()}), 200


#profile
@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200
