import os
import secrets
from dotenv import load_dotenv
import redis

from users import UserManager
from login import LoginManager

load_dotenv()


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or secrets.token_hex(128)
    DEBUG = bool(os.environ.get('DEBUG')) or False

    REDIS_NAME = os.environ.get('REDIS_NAME') or 'localhost'
    JWT_SECRET = os.environ.get(
        'JWT_SECRET') or 'ChangeMeChangeMeChangeMeChangeMeChangeMeChangeMeChangeMeChangeMeChangeMe'
    JWT_SESSION_TIME = int(os.environ.get('JWT_SESSION_TIME') or '4')

    FILE_STORE_HOST = os.environ.get('FILE_STORE_HOST') or 'localhost'
    FILE_STORE_URL = f'http://{FILE_STORE_HOST}:8081'

    PUBLICATION_API_HOST = os.environ.get(
        'PUTLICATION_API_HOST') or 'localhost'
    PUBLICATION_API_URL = f'http://{PUBLICATION_API_HOST}:8090'

    redis = redis.Redis(REDIS_NAME)
    user_manager = UserManager(redis)
    login_manager = LoginManager(redis)
