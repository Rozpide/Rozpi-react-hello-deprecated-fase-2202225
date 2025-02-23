from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task, PredefinedTask
from api.utils import generate_sitemap, APIException, update_task_summary
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

    user = User(
        email=body['email'],
        password=body['password'],
        is_active=True
    )
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
            "address": user.address,
            "tasks": [task.serialize() for task in user.tasks] # Incluir tareas en la serialización
        } for user in users
    ]
    return jsonify(user_list), 200
200


#-------------------------------BORRAR UN USUARIO-------------------------------------
@api.route('/users/<int:id>', methods=['DELETE'])
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

#------------------------- CREAR TAREA--------------------------------------------

@api.route('/tasks', methods=['POST'])
@jwt_required()
def create_task():
    body = request.get_json()
    user_id = get_jwt_identity()

    if not body or 'title' not in body:
        raise APIException("You need to specify the title", status_code=400)

    task = Task(title=body['title'], description=body.get('description'), user_id=user_id)
    db.session.add(task)
    db.session.commit()
    
    update_task_summary(user_id)  # Actualizar el resumen de tareas del usuario

    return jsonify({"message": "Task created successfully"}), 201

#-------------------------OBTENER TODAS LAS TAREAS--------------------------------------------

@api.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id).all()
    tasks_list = [task.serialize() for task in tasks]
    return jsonify(tasks_list), 200

#-------------------------MODIFICAR TAREA--------------------------------------------

@api.route('/tasks/<int:id>', methods=['PUT'])
@jwt_required()
def update_task(id):
    user_id = get_jwt_identity()
    task = Task.query.get(id)
    if not task:
        raise APIException("Task not found", status_code=404)

    body = request.get_json()
    if not body:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)

    if 'title' in body:
        task.title = body['title']
    if 'description' in body:
        task.description = body['description']
    if 'is_completed' in body:
        task.is_completed = body['is_completed']
        
    task.user_id = user_id # Actualizar el id del usuario

    db.session.commit()
    return jsonify({"message": "Task updated successfully"}), 200

#-------------------------BORRAR TAREA--------------------------------------------

@api.route('/tasks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    user_id = get_jwt_identity()
    task = Task.query.get(id)
    if not task:
        raise APIException("Task not found", status_code=404)
    if task.user_id != user_id:  # Asegúrate de que el user_id coincide
        raise APIException("You are not authorized to delete this task", status_code=403)

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"}), 200
    
#------------------------CREAR TAREA PREDEFINIDA--------------------------------------------

@api.route('/predefined_tasks', methods=['POST'])
@jwt_required()
def create_predefined_task():
    body = request.get_json()
    
    if not body or 'title' not in body:
        raise APIException("You need to specify the title", status_code=400)

    task = PredefinedTask(title=body['title'], description=body.get('description'))
    db.session.add(task)
    db.session.commit()

    return jsonify({"message": "Predefined task created successfully"}), 201

#------------------------OBTENER TAREAS PREDEFINIDAS--------------------------------------------

@api.route('/predefined_tasks', methods=['GET'])
@jwt_required()
def get_predefined_tasks():
    tasks = PredefinedTask.query.all()
    task_list = [task.serialize() for task in tasks]
    return jsonify(task_list), 200

#---------------------ASIGNAR TAREA--------------------------------------------

@api.route('/assign_task', methods=['POST'])
@jwt_required()
def assign_task():
    body = request.get_json()

    if not body or 'task_id' not in body or 'user_id' not in body:
        raise APIException("You need to specify the task_id and user_id", status_code=400)

    predefined_task = PredefinedTask.query.get(body['task_id'])
    if not predefined_task:
        raise APIException("Predefined task not found", status_code=404)

    user_id = body['user_id']
    user = User.query.get(user_id)
    if not user:
        raise APIException("User not found", status_code=404)

    task = Task(title=predefined_task.title, description=predefined_task.description, user_id=user_id)
    db.session.add(task)
    db.session.commit()

    # Actualizar el resumen de tareas
    update_task_summary(user_id)

    return jsonify({"message": "Task assigned to user successfully"}), 201
