
import click
from api.models import db, User, Games
import json

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        print("Creating test games")

        for x in range(1, 2):
            # user = Games()
            # user.email = "test_user" + str(x) + "@test.com"
            # user.password = "123456"
            # user.is_active = True
            game = Games()
            game.id: Mapped[int] = mapped_column(primary_key=True)
            name: Mapped[str] = mapped_column(String(250), unique=True, nullable=False)
            app_id: Mapped[int] = mapped_column(Integer, nullable=True)
            release: Mapped[str] = mapped_column(String(100), nullable=True)
            image_id: Mapped[str] = mapped_column(String(255), nullable=True)
            score: Mapped[float] = mapped_column(Float, nullable=True)
            g2a_price: Mapped[float] = mapped_column(Float, nullable=True)
            g2a_url: Mapped[str] = mapped_column(String(250), nullable=True)
            steam_price: Mapped[float] = mapped_column(Float, nullable=True)
            # tags: Mapped[List[String]] = mapped_column(nullable=True)
            # relación con favoritos
            favourited: Mapped[List["Favourites"]] = relationship(back_populates="favourite_game")
            # relación con tags
            game_tags: Mapped[List["Tags"]] = relationship(secondary=tags_games_association_table, back_populates="games")
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")
        pass