from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
@app.route('/signup')
def sing_up():
    return render_template('signup.html')