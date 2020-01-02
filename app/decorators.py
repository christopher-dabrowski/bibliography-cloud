"""Module for decorators used in project"""

from functools import wraps
from flask import request, render_template, flash, make_response
from config import Config


def login_required(f):
    """Decorator for routes that require user login"""
    login_manager = Config.login_manager

    @wraps(f)
    def decorated(*args, **kwargs):
        session_id = request.cookies.get('session-id')
        if session_id is None:
            flash('Wprowadzony adres wymaga logowania', 'alert-danger')
            return render_template('index.html'), 403

        if not login_manager.isSessionValid(session_id):
            flash('Sesja wygasła', 'alert-warning')
            response = make_response(render_template('index.html'))
            response.set_cookie('session-id', '', expires=0)  # Clear cookie
            return response, 403

        login = login_manager.getLogin(session_id)

        return f(*args, login=login, **kwargs)

    return decorated
