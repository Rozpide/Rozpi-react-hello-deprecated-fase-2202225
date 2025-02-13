"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Games, Tags, Favourites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import requests
import subprocess

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    data = db.session.scalars(db.select(User)).all()
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/games", methods=['GET'])
def get_all_games():
    data = db.session.scalars(db.select(Games)).all()
    results = list(map(lambda item: item.serialize(), data))
    response_body = {
        "results": results
    }
    return jsonify(response_body), 200

@api.route("/games", methods=['POST'])
def post_game():
    request_data = request.json
    name = request_data.get('name')
    tags_id = request_data.get('tags')
    try:
        game = db.session.execute(db.select(Games).filter_by(name=name)).scalar_one()
        if game:
            return jsonify({'msg': "game already exists, did you mean to do a PUT?"}), 400
    except:
        pass
    tags = []
    if not isinstance(tags_id, list):
            return jsonify({"error": "residents_id must be a list"}), 400

    try:
        tags = db.session.scalars(db.select(Tags).filter(Tags.id.in_(tags_id))).all()
    except:
        pass
    # data = db.session.scalars(db.select(Games)).all()
    # results = list(map(lambda item: item.serialize(), data))
    result = Games(
        name = request_data.get('name'),
        app_id = request_data.get('app_id'),
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
    return jsonify(result.serialize()), 200


@api.route("/tags", methods=['GET'])
def get_all_tags():
    data = db.session.scalars(db.select(Tags)).all()
    results = list(map(lambda item: item.serialize(), data))
    response_body = {
        "results": results
    }
    return jsonify(response_body), 200

def fetch_steam_data():
    url = "https://store.steampowered.com/api/appdetails?appids=746"
    response = requests.get(url)  
    if response.status_code == 200:
        return response.json()
    return None

@api.route('/steam/test', methods=['GET'])
def get_steam_data():
    data = fetch_steam_data()
    
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
    