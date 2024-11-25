"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Usuario, Evento
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


bp = Blueprint('routes', __name__)

@bp.route('/clima', methods=['GET'])
def obtener_clima():
    ciudad = request.args.get('ciudad', 'Santiago')
    api_key = 'TU_API_KEY_DE_CLIMA'
    url = f'http://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid={api_key}&units=metric'
    response = ext_requests.get(url)
    return jsonify(response.json())

@bp.route('/eventos', methods=['GET', 'POST'])
def manejar_eventos():
    if request.method == 'POST':
        data = request.json
        evento = Evento(
            usuario_id=data['usuario_id'],
            titulo=data['titulo'],
            descripcion=data.get('descripcion', ''),
            fecha=data['fecha'],
            clima=data['clima']
        )
        db.session.add(evento)
        db.session.commit()
        return jsonify({'message': 'Evento creado'})
    eventos = Evento.query.all()
    return jsonify([{
        'id': e.id,
        'titulo': e.titulo,
        'descripcion': e.descripcion,
        'fecha': e.fecha,
        'clima': e.clima
    } for e in eventos])
