from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
@app.route('/index')
@app.route('/signup')
def sing_up():
    return render_template('signup.html')