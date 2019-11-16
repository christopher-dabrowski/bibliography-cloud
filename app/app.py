from flask import Flask
from flask import render_template
from livereload import Server
import os
from dotenv import load_dotenv
from config import Config

from forms import LoginForm

app = Flask(__name__)
app.config.from_object(Config)


@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    return render_template('index.html')


@app.route('/signup')
def signup():
    return render_template('signup.html', title='Kreacja konta')


@app.route('/login', methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # TODO: Check login and password

        return f'Udało Ci się wpisać login!\nLogin: {form.login.data}\nHasło: {form.password.data}'

    return render_template('login.html', title='Logowanie', form=form)


if app.debug:
    server = Server(app.wsgi_app)
    # server.watch
    server.serve(port=5000)
