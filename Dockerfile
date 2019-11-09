FROM python:3
EXPOSE 5000

WORKDIR /var/www

RUN pip install --upgrade pip

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app

ENV FLASK_APP app/app.py
ENV FLASK_RUN_HOST 0.0.0.0

CMD ["flask", "run"]