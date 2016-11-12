FROM python:3.3

# Set in what directory commands will run
WORKDIR /code/

# Put all our code inside that directory that lives in the container
ADD . /code/

# Pip install our requirements
RUN pip install -r requirements.txt

ADD run /usr/local/bin/run
RUN chmod +x /usr/local/bin/run
CMD /usr/local/bin/run