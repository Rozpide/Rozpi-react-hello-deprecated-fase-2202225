from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    phoneNumber = db.Column(db.Integer, nullable=False)
    player = db.Column(db.Boolean, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('hosts.id'))
    player_id = db.Column(db.Integer, db.ForeignKey('players.id'))

    def __repr__(self):
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "phoneNumber" : self.phoneNumber,
            "player": self.player
        }