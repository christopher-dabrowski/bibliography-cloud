import os
import secrets
from dotenv import load_dotenv

load_dotenv()


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or secrets.token_hex(128)
    DEBUG = bool(os.environ.get('DEBUG')) or False

    REDIS_NAME = os.environ.get('REDIS_NAME') or 'localhost'
