from flask import Flask
from flask import render_template
from livereload import Server
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.debug = True

@app.route('/')
@app.route('/index')
@app.route('/signup')
def sing_up():
    return render_template('signup.html')

if 'DEBUG' in os.environ and os.environ['DEBUG'].lower() == 'true':
    server = Server(app.wsgi_app)
    # server.watch
    server.serve(port=5000)