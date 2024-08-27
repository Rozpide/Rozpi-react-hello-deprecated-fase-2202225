"""empty message

<<<<<<< HEAD
Revision ID: 958f5cf59364
Revises: 
Create Date: 2024-08-26 19:14:05.934290
=======
<<<<<<<< HEAD:migrations/versions/430f3420a874_.py
Revision ID: 430f3420a874
Revises: 
Create Date: 2024-08-26 14:54:12.289000
========
Revision ID: 958f5cf59364
Revises: 
Create Date: 2024-08-26 19:14:05.934290
>>>>>>>> 4a8957d (meets):migrations/versions/958f5cf59364_.py
>>>>>>> c27bf30 (meets)

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD
revision = '958f5cf59364'
=======
<<<<<<<< HEAD:migrations/versions/430f3420a874_.py
revision = '430f3420a874'
========
revision = '958f5cf59364'
>>>>>>>> 4a8957d (meets):migrations/versions/958f5cf59364_.py
>>>>>>> c27bf30 (meets)
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('especialidades',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('especialidad', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre_usuario', sa.String(length=50), nullable=False),
    sa.Column('apellido', sa.String(length=50), nullable=False),
    sa.Column('descripcion', sa.Text(), nullable=True),
    sa.Column('fecha_de_nacimiento', sa.Date(), nullable=True),
    sa.Column('codigo_de_area', sa.String(length=10), nullable=True),
    sa.Column('telefono', sa.String(length=20), nullable=True),
    sa.Column('correo', sa.String(length=40), nullable=False),
    sa.Column('clave', sa.String(length=80), nullable=True),
    sa.Column('is_psicologo', sa.Boolean(), nullable=False),
    sa.Column('foto', sa.String(length=255), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('correo'),
    sa.UniqueConstraint('telefono')
    )
    op.create_table('clave_reset_token',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(length=256), nullable=False),
    sa.Column('expiration', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('token')
    )
    op.create_table('comentarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=False),
    sa.Column('id_profesional', sa.Integer(), nullable=False),
    sa.Column('comentario', sa.Text(), nullable=False),
    sa.Column('puntaje', sa.Integer(), nullable=False),
    sa.Column('fecha_de_publicacion', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['id_profesional'], ['user.id'], ),
    sa.ForeignKeyConstraint(['id_usuario'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_especialidad',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('especialidad_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['especialidad_id'], ['especialidades.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'especialidad_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_especialidad')
    op.drop_table('comentarios')
    op.drop_table('clave_reset_token')
    op.drop_table('user')
    op.drop_table('especialidades')
    # ### end Alembic commands ###
