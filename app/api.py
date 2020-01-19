"""
Flask template for interaction with other services

Capable of verifying user cookies
"""

from flask import Blueprint, request, abort, jsonify, redirect, Response
from decorators import login_required
from jwt_tokens import create_list_token, create_download_token
from flask_sse import sse


api = Blueprint('api', __name__, template_folder='templates')


def map_action_to_message(publication_name: str, action: str) -> str:
    """Crete right message for SSE when publication list changed"""
    if action == 'created':
        return f'Publikacja {publication_name} została utworzona'
    if action == 'changed':
        return f'Publikacja {publication_name} została zmieniona'
    if action == 'deleted':
        return f'Publikacja {publication_name} została usunięta'

    return f'Coś się stało z publikacją {publication_name}'


@api.route('login')
@login_required
def get_login(login):
    return login


@api.route('publicationMessage')
@login_required
def register_publication_sse(login):
    # return 'hi'
    # sse.publish({'message': 'hi'}, type=f'user:{login}')

    publication_name = request.args.get('publication', None)
    if not publication_name:
        abort(404)

    action = request.args.get('action', '')

    message = map_action_to_message(publication_name, action)
    sse.publish({'message': message, 'action': action}, type=f'user:{login}')

    return 'Ok'


@api.route('jwt/<string:type>')
@login_required
def get_token(type, login):
    """Way for React frontend to get JWT tokens"""

    token = None
    if (type == 'listFiles'):
        token = create_list_token(login)
    elif (type == 'downloadFile'):
        file_name = request.args['fileName']
        if not file_name:
            abort(400)
        token = create_download_token(login, file_name)

    if token == None:
        abort(404)

    return jsonify({'token': token})


@api.route('downloadFile')
@login_required
def downloadFile(login):
    """Redirect to file download"""
    file_name = request.args['fileName']
    if not file_name:
        abort(400)

    token = create_download_token(login, file_name)
    url = 'http://localhost:8081' + \
        f'/files/{file_name}?user={login}&token={token}'
    return redirect(url)
