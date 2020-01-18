"""
Flask template for interaction with other services

Capable of verifying user cookies
"""

from flask import Blueprint, request, abort, jsonify, redirect, Response
from decorators import login_required
from jwt_tokens import create_list_token, create_download_token
from flask_sse import sse


api = Blueprint('api', __name__, template_folder='templates')


@api.route('login')
@login_required
def get_login(login):
    return login


@api.route('publicationMessage')
@login_required
def register_publication_sse(login):
    publication_name = request.args.get('publication', None)
    if not publication_name:
        abort(404)

    action = request.args.get('action', 'created')

    sse.publish({'message': f'Publikacja {publication_name}', 'action': action},
                type=f'user:{login}')

    return Response(201)


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
