import os
import secrets
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, make_response
from livereload import Server
from forms import LoginForm
import redis
from config import Config
from setup import create_sample_users
from users import UserManager
from login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)

red = redis.Redis()
user_manager = UserManager(red)
login_manager = LoginManager(red)

create_sample_users(user_manager)


@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    session_id = request.cookies.get('session-id')
    if session_id is None:
        # TODO: Display invalid message
        return render_template('index.html')

    if not login_manager.isSessionValid(session_id):
        # TODO: Display invalid message
        response = make_response(render_template('index.html'))
        response.set_cookie('session-id', '', expires=0)  # Clear cookie
        return response

    login = login_manager.getLogin(session_id)
    return render_template('index.html', logged=True, login=login)


@app.route('/signup')
def signup():
    # TODO: Create user and validate
    return render_template('signup.html', title='Kreacja konta')


@app.route('/login', methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        login = form.login.data

        session_id = login_manager.registerLogin(login)
        response = redirect(url_for('index'))
        response.set_cookie('session-id', session_id)
        return response

    else:
        return render_template('login.html', title='Logowanie', form=form)


@app.route('/logout', methods=["GET"])
def logout():
    session_id = request.cookies.get('session-id')
    login_manager.registerLogout(session_id)

    response = redirect(url_for('index'))
    response.set_cookie('session-id', '', expires=0)  # Clear cookie
    return response


if app.debug:
    server = Server(app.wsgi_app)
    # server.watch
    server.serve(port=5000)
