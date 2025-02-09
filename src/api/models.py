from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=True)  
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    age = db.Column(db.Integer, nullable=True) 
    location = db.Column(db.String(100), nullable=True)  
    description = db.Column(db.Text, nullable=True)    
    profile_image = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "age": self.age,
            "location": self.location,
            "description": self.description,
            "profile_image": self.profile_image,
            # do not serialize the password, its a security breach
        }