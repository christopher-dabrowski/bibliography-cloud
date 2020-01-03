"""Flask template for interaction with other services"""

from flask import Blueprint, request
from decorators import login_required

api = Blueprint('api', __name__, template_folder='templates')


@api.route('login')
@login_required
def get_login(login):
    return login
