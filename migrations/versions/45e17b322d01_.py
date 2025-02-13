"""empty message

Revision ID: 45e17b322d01
Revises: cd74348c0679
Create Date: 2025-02-12 22:54:43.380190

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45e17b322d01'
down_revision = 'cd74348c0679'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('app_id', sa.Integer(), nullable=True),
    sa.Column('release', sa.String(length=100), nullable=True),
    sa.Column('image_id', sa.String(length=255), nullable=True),
    sa.Column('score', sa.Float(), nullable=True),
    sa.Column('g2a_price', sa.Float(), nullable=True),
    sa.Column('g2a_url', sa.String(length=250), nullable=True),
    sa.Column('steam_price', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tag_name', sa.String(length=30), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tag_name')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favourites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=False),
    sa.Column('user_favourites_id', sa.Integer(), nullable=False),
    sa.Column('favourite_game_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['favourite_game_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['user_favourites_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags_games_association_table',
    sa.Column('games_id', sa.Integer(), nullable=False),
    sa.Column('tags_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['games_id'], ['games.id'], ),
    sa.ForeignKeyConstraint(['tags_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('games_id', 'tags_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tags_games_association_table')
    op.drop_table('favourites')
    op.drop_table('user')
    op.drop_table('tags')
    op.drop_table('games')
    # ### end Alembic commands ###
