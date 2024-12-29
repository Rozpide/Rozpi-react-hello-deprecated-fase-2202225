from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(), unique=False, nullable=True)
    picture = db.Column(db.String(), unique=False, nullable=True)
    nationality = db.Column(db.String(), unique=False, nullable=True)
    residence = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User {self.id} - {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'name': self.name,
                'picture': self.picture,
                'nationality': self.nationality,
                'residence': self.residence}
