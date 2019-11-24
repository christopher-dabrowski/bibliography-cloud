"""File for storing classes representing forms and validators"""

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import DataRequired, Email
from users import UserManager
from config import Config


class LoginValidator(object):
    def __init__(self, message='Invalid login'):
        self.message = message

    def __call__(self, form, field):
        if not Config.user_manager.checkUser(field.data):
            raise ValidationError(self.message)


class PasswordValidator(object):
    def __init__(self, message='Invalid password'):
        self.message = message

    def __call__(self, form, field):
        login = form.login.data
        if not login:
            return

        if not Config.user_manager.validatePassword(login, field.data):
            raise ValidationError(self.message)


class LoginForm(FlaskForm):
    login = StringField('login', validators=[
                        DataRequired('Pole wymagane'), LoginValidator('Nieprawidłowy login')])
    password = PasswordField('password', validators=[
                             DataRequired('Pole wymagane'), PasswordValidator('Nieprawidłowe hasło')])
