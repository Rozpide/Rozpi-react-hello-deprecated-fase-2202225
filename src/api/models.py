from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coin_id = db.Column(db.String(10))
    name = db.Column(db.String(20))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    symbol = db.Column(db.String(20))

    def __repr__(self):
        return '<Favorites %r>' % self.email

    def serialize(self):
        return {
            "id": Favorites.id,
            "Coin ID": Favorites.coin_id,
            "name": Favorites.name,
            "user_id": Favorites.user_id,
            "symbol": Favorites.symbol
        }

class Wallet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    coin_id = db.Column(db.String(10))
    name = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    symbol = db.Column(db.String(20))
    purchase_price = db.Column(db.String(20))
    purchase_quantity = db.Column(db.String(20))

    def __repr__(self):
        return '<Wallet %r>' % self.email

    def serialize(self):
        return {
            "id": Wallet.id,
            "Coin_id": Wallet.coin_id,
            "name": Wallet.name,
            "user_id": Wallet.user_id,
            "symbol": Wallet.symbol,
            "purchase_price": Wallet.purchase_price,
            "purchase_quantity": Wallet.purchase_quantity
        }
