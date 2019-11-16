from flask import Flask
from flask import render_template
from livereload import Server
import os
from dotenv import load_dotenv
from config import Config

load_dotenv()

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

@app.route('/login')
def login():
    return render_template('login.html', title='Logowanie')

if app.debug:
    server = Server(app.wsgi_app)
    # server.watch
    server.serve(port=5000)
