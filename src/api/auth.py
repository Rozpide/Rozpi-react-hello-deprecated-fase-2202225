from flask import Blueprint, request, jsonify
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import Usuario, db

bp = Blueprint('auth', __name__)

@bp.route('/google-login', methods=['POST'])
def google_login():
    token = request.json.get('token')
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request())
        email = idinfo['email']
        nombre = idinfo.get('name', email)

        usuario = Usuario.query.filter_by(email=email).first()
        if not usuario:
            usuario = Usuario(email=email, nombre=nombre)
            db.session.add(usuario)
            db.session.commit()

        return jsonify({'message': 'Login exitoso', 'usuario': {'email': email, 'nombre': nombre}})
    except ValueError:
        return jsonify({'error': 'Token inválido'}), 400
