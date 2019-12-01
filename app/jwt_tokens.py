"""Generate JWT tokens"""

import jwt
import datetime
from config import Config


def create_delete_token(user_name: str):
    exp = datetime.datetime.utcnow() + datetime.timedelta(seconds=Config.JWT_SESSION_TIME)
    payload = {
        "iss": "bibiograpy-cloud.pl",
        "exp": exp,
        "user": user_name,
        "delete": True
    }

    return jwt.encode(payload, Config.JWT_SECRET, 'HS256').decode()


def create_upload_token(user_name: str):
    exp = datetime.datetime.utcnow() + datetime.timedelta(seconds=Config.JWT_SESSION_TIME)
    payload = {
        "iss": "bibiograpy-cloud.pl",
        "exp": exp,
        "user": user_name,
        "upload": True
    }

    return jwt.encode(payload, Config.JWT_SECRET, 'HS256').decode()


def create_download_token(user_name: str, file_name: str):
    exp = datetime.datetime.utcnow() + datetime.timedelta(seconds=Config.JWT_SESSION_TIME)
    payload = {
        "iss": "bibiograpy-cloud.pl",
        "exp": exp,
        "user": user_name,
        "download": True,
        "fileName": file_name
    }

    return jwt.encode(payload, Config.JWT_SECRET, 'HS256').decode()


def create_list_token(user_name: str):
    exp = datetime.datetime.utcnow() + datetime.timedelta(seconds=Config.JWT_SESSION_TIME)
    payload = {
        "iss": "bibiograpy-cloud.pl",
        "exp": exp,
        "user": user_name,
        "list": True
    }

    return jwt.encode(payload, Config.JWT_SECRET, 'HS256').decode()
