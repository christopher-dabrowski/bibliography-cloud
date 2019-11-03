from app import app

@app.route('/')
@app.route('/index')
@app.route('/signup')
def sing_up():
    return 'Sign up here!'