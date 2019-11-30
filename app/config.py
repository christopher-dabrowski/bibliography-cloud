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
    JWT_SECRET = os.environ.get('JWT_SECRET') or 'ChangeMe'
    JWT_SESSION_TIME = int(os.environ.get('JWT_SESSION_TIME') or '10')

    API_URL = 'http://localhost:8081'

    redis = redis.Redis(REDIS_NAME)
    user_manager = UserManager(redis)
    login_manager = LoginManager(redis)
