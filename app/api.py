"""
Flask template for interaction with other services

Capable of verifying user cookies
"""

from flask import Blueprint, request, abort, jsonify
from decorators import login_required
from jwt_tokens import create_list_token, create_download_token

api = Blueprint('api', __name__, template_folder='templates')


@api.route('login')
@login_required
def get_login(login):
    return login


@api.route('jwt/<string:type>')
@login_required
def get_token(type, login):
    """Way for React frontend to get JWT tokens"""

    token = None
    if (type == 'listFiles'):
        token = create_list_token(login)
    elif (type == 'downloadFile'):
        fileName = request.args['fileName']
        if not fileName:
            abort(400)
        token = create_download_token(login, fileName)

    if token == None:
        abort(404)

    return jsonify({'token': token})
