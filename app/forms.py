from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, ValidationError
from wtforms.validators import DataRequired, Email
from users import UserManager


class LoginValidator(object):
    def __init__(self, message='Invalid login'):
        self.message = message

    def __call__(self, form, field):
        if not UserManager().checkUser(field.data):
            raise ValidationError(self.message)


class PasswordValidator(object):
    def __init__(self, message='Invalid password'):
        self.message = message

    def __call__(self, form, field):
        login = form.login.data
        if not login:
            return

        if not UserManager().validatePassword(login, field.data):
            raise ValidationError(self.message)


class LoginForm(FlaskForm):
    login = StringField('login', validators=[
                        DataRequired('Pole wymagane'), LoginValidator('Nieprawidłowy login')])
    password = PasswordField('password', validators=[
                             DataRequired('Pole wymagane'), PasswordValidator('Nieprawidłowe hasło')])
