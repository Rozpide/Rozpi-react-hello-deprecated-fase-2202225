"""empty message

<<<<<<<< HEAD:migrations/versions/d830b34f96f4_.py
Revision ID: d830b34f96f4
Revises: 
Create Date: 2025-02-06 17:50:42.602424
========
Revision ID: 70d9d9fddd7e
Revises: 
Create Date: 2025-02-06 17:17:05.573677
>>>>>>>> a8be23d61fcf75d4b9e2651ded176de1540f3c92:migrations/versions/70d9d9fddd7e_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/d830b34f96f4_.py
revision = 'd830b34f96f4'
========
revision = '70d9d9fddd7e'
>>>>>>>> a8be23d61fcf75d4b9e2651ded176de1540f3c92:migrations/versions/70d9d9fddd7e_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Crear la tabla hosts primero
    op.create_table('hosts',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('court_type', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('phone', sa.String(length=15), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )

    # Luego crear la tabla tournaments
    op.create_table('tournaments',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('type', sa.String(), nullable=False),
        sa.Column('inscription_fee', sa.Integer(), nullable=False),
        sa.Column('rating', sa.Integer(), nullable=False),
        sa.Column('schedule', sa.DateTime(), nullable=False),
        sa.Column('award', sa.String(), nullable=False),
        sa.Column('tournament_winner', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('participants_amount', sa.Integer(), nullable=False),
        sa.Column('participants_registered', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Crear las demás tablas
    op.create_table('players',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('gender', sa.String(), nullable=True),
        sa.Column('age', sa.Integer(), nullable=True),
        sa.Column('rating', sa.Integer(), nullable=True),
        sa.Column('side', sa.String(), nullable=True),
        sa.Column('hand', sa.String(), nullable=True),
        sa.Column('image', sa.String(), nullable=True),
        sa.Column('phone', sa.String(length=15), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    #...

def downgrade():
    # Eliminar las tablas en orden inverso
    op.drop_table('players')
    op.drop_table('tournaments')
    op.drop_table('hosts')