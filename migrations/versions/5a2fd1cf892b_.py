"""empty message

Revision ID: 5a2fd1cf892b
Revises: a2ea06beb0e6
Create Date: 2024-01-03 14:12:48.925065

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5a2fd1cf892b'
down_revision = 'a2ea06beb0e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('movie', schema=None) as batch_op:
        batch_op.add_column(sa.Column('release_date', sa.String(length=80), nullable=False))
        batch_op.drop_column('relese_date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('movie', schema=None) as batch_op:
        batch_op.add_column(sa.Column('relese_date', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.drop_column('release_date')

    # ### end Alembic commands ###
