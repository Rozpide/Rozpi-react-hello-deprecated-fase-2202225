"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Games, Tags, Favourites
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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