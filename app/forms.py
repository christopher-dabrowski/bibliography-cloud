from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email

class LoginForm(Form):
    login = StringField('login', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])