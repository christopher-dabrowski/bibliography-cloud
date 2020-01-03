import os
import secrets
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, make_response, flash
import requests
import urllib.parse
from livereload import Server
from forms import LoginForm, FileUploadForm
import redis
from config import Config
from jwt_tokens import create_download_token, create_upload_token, create_list_token, create_delete_token
from setup import create_sample_users
from decorators import login_required

from api import api

app = Flask(__name__)
app.config.from_object(Config)
app.register_blueprint(api, url_prefix='/api')

user_manager = Config.user_manager
login_manager = Config.login_manager

create_sample_users(user_manager)


@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    session_id = request.cookies.get('session-id')
    if session_id is None:
        return render_template('index.html')

    if not login_manager.isSessionValid(session_id):
        flash('Sesja wygasła', 'alert-warning')
        response = make_response(render_template('index.html'))
        response.set_cookie('session-id', '', expires=0)  # Clear cookie
        return response

    login = login_manager.getLogin(session_id)
    return render_template('index.html', logged=True, login=login)


@app.route('/publications')
@login_required
def publications(login):
    app_url = request.url_root
    file_api_url = Config.FILE_STORE_URL
    publications_api_url = Config.PUBLICATION_API_URL
    return render_template('publications.html', logged=True, login=login,
                           app_url=app_url, file_api_url=file_api_url, publications_api_url=publications_api_url)


@app.route('/files/delete/<int:id>')
@login_required
def delete_file(id, login):
    # Map id to file name
    token = create_list_token(login)
    url = Config.FILE_STORE_URL + f"/files?user={login}&token={token}"
    r = requests.get(url)
    if (r.status_code != 200):
        flash("Nie udało się pobrać pliku", "alert-danger")
        return redirect(url_for('index'))

    files = r.json()
    file_name = files[id]['fileName']

    token = create_delete_token(login)
    url = Config.FILE_STORE_URL + \
        f"/files?user=jan&file={file_name}&token={token}"
    r = requests.delete(url)

    if r.status_code == 200:
        flash('Plik został usunięty', category='alert-success')
    else:
        flash('Nie udało się usunąć pliku', category='alert-danger')

    return redirect(url_for('files'))


@app.route('/files/download/<int:id>')
@login_required
def download_file(id, login):
    # Map id to file name
    token = create_list_token(login)
    url = Config.FILE_STORE_URL + f"/files?user={login}&token={token}"
    r = requests.get(url)
    if (r.status_code != 200):
        flash("Nie udało się pobrać pliku", "alert-danger")
        return redirect(url_for('index'))

    files = r.json()
    file_name = files[id]['fileName']

    token = create_download_token(login, file_name)
    url = 'http://localhost:8081' + \
        f'/files/{file_name}?user={login}&token={token}'

    return redirect(url)


@app.route('/files/upload', methods=["POST"])
@login_required
def upload_file(login):
    form = FileUploadForm()
    form.validate()
    if len(form.file.errors) > 0:
        flash('Brak pliku do wysłania', category='alert-warning')
        return redirect(url_for('files'))

    token = create_upload_token(login)
    url = Config.FILE_STORE_URL + f'/files?user={login}&token={token}'
    files = {'file': (form.file.data.filename, form.file.data)}

    r = requests.post(url, files=files)
    if r.status_code == 200:
        flash('Plik został przesłany', category='alert-success')
    else:
        flash('Nie udało się przesłać pliku', category='alert-danger')

    return redirect(url_for('files'))


@app.route('/files')
@login_required
def files(login):
    # Get user files
    token = create_list_token(login)
    url = Config.FILE_STORE_URL + f"/files?user={login}&token={token}"

    r = requests.get(url)
    if (r.status_code != 200):
        flash("Nie udało się pobrać listy plików", "alert-danger")
        return redirect(url_for('index'))

    files_dto_list = r.json()
    for i, file in enumerate(files_dto_list):
        delete_link = url_for('delete_file', id=i)
        file_name = file['fileName']
        download_link = url_for('download_file', id=i)
        file['links'] = {'delete': delete_link, 'download': download_link}
        file['id'] = str(i)

    return render_template('files.html', logged=True, login=login, files=files_dto_list)


@app.route('/signup')
def signup():
    # TODO: Create user and validate
    flash('Kreacja konta aktualnie nie działa', 'alert-danger')
    return render_template('signup.html', title='Kreacja konta')


@app.route('/login', methods=["GET", "POST"])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        login = form.login.data

        session_id = login_manager.registerLogin(login)
        response = redirect(url_for('index'))
        response.set_cookie('session-id', session_id,
                            httponly=True)
        return response

    else:
        return render_template('login.html', title='Logowanie', form=form)


@app.route('/logout', methods=["GET"])
def logout():
    session_id = request.cookies.get('session-id')
    login_manager.registerLogout(session_id)

    flash('Nastąpiło poprawne wylogowanie', 'alert-success')
    response = redirect(url_for('index'))
    response.set_cookie('session-id', '', expires=0,
                        httponly=True)  # Clear cookie
    return response


# Run app with live reload
if app.debug:
    server = Server(app.wsgi_app)
    # server.watch
    server.serve(port=5000)
