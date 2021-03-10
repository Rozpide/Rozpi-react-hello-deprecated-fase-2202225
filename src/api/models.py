from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    nombre_completo = db.Column(db.String(120), unique=False, nullable=False)
    respuesta_de_seguridad = db.Column(db.String(120), unique=False, nullable=False)
    mi_pasaporte = db.relationship('Mi_pasaporte', lazy=True)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nombre_completo": self.nombre_completo
            # do not serialize the password, its a security breach
        }

class Pymes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)
    descripcion = db.Column(db.String(300), unique=False, nullable=False)
    provincia = db.Column(db.String(300), unique=False, nullable=False)
    contacto = db.Column(db.String(300), unique=False, nullable=False)
    imagen = db.Column(db.String(1000), unique=False, nullable=False)
    lat = db.Column(db.Float, unique=False, nullable=False)
    lon = db.Column(db.Float, unique=False, nullable=False)
    tipo = db.Column(db.String(100), unique=True, nullable=False)
    amenity = db.Column(db.String(100), unique=False, nullable=False)
    id_osm = db.Column(db.Integer,unique=False, nullable=False)
    mi_pasaporte = db.relationship('Mi_pasaporte')

    def __repr__(self):
        return '<Playa %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "descripcion": self.descripcion,
            "provincia": self.provincia,
            "contacto": self.contacto,
            "imagen": self.imagen,
            "lat": self.lat,
            "lon": self.lon,
            "tipo": self.tipo,
            "amenity": self.amenity,
            "id_osm": self.id_osm
        }

class Mi_pasaporte(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    #tipo playa o montaña
    tipo_pymes = db.Column(db.String(100))
    nombre = db.Column(db.String(250), unique=False, nullable=False)

    #id del pyme

    def __repr__(self):
        return '<Mi_pasaporte %r>' % self.id

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "nombre": self.nombre,
            "tipo_pymes": self.tipo_pymes
        }
