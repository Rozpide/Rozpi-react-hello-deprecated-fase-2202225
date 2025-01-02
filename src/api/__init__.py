from flask import Flask
from flask_cors import CORS
from .auth_routes import auth_routes
from .user_routes import user_routes_v2
from .product_routes import product_routes
from .category_routes import category_routes

"""
Este módulo inicializa y registra las rutas del API en la aplicación Flask.
"""

def create_app():
    app = Flask(__name__)

    # Configurar CORS globalmente
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Registrar blueprints
    register_routes(app)

    return app

def register_routes(app: Flask):
    app.register_blueprint(auth_routes, url_prefix='/auth')
    app.register_blueprint(user_routes_v2, url_prefix='/api/user')
    app.register_blueprint(product_routes, url_prefix='/api/products')
    app.register_blueprint(category_routes, url_prefix='/api/categories')
