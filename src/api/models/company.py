from api.models.db import db
from datetime import datetime


class Company(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    avatar = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    cp = db.Column(db.Integer(), nullable=False)
    cif = db.Column(db.Integer(), unique=True, nullable=False)
    review = db.relationship('Review', back_populates='company')
    favs = db.relationship("Favorites", back_populates="company") 
    data_create = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, email,avatar, address, city, cp, cif):
        self.name = name
        self.email = email
        self.avatar = avatar
        self.address = address
        self.city = city
        self.cp = cp
        self.cif = cif
        self.data_create = datetime.utcnow()