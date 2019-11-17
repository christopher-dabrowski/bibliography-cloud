import os
import secrets
from dotenv import load_dotenv
from flask import Flask, render_template
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
    return render_template('index.html')


@app.route('/signup')
def signup():
    # TODO: Create user and validate
    return render_template('signup.html', title='Kreacja konta')


@app.route('/login', methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # TODO: Check login and password
        # TODO: Give a cookie 🍪
        login = form.login.data
        password = form.password.data

        return f'Udało Ci się wpisać login!\nLogin: {login}\nHasło: {password}'

    # TODO: Send back errors
    return render_template('login.html', title='Logowanie', form=form)


if app.debug:
    server = Server(app.wsgi_app)
    # server.watch
    server.serve(port=5000)
