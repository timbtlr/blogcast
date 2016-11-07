# This image will be based on the official nodejs docker image
FROM python:3.3

# Set in what directory commands will run
WORKDIR /code/

# Put all our code inside that directory that lives in the container
ADD . /code/

# Pip install our requirements
RUN pip install -r requirements.txt

# The command to run our app when the container is run
CMD python manage.py migrate; gunicorn -b 0.0.0.0:80 --pythonpath app config.wsgi --log-file -