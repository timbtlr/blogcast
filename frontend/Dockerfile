# This image will be based on the official nodejs docker image
FROM node:latest

ADD .bowerrc /code/.bowerrc
ADD package.json /code/package.json
ADD bower.json /code/bower.json

# Set in what directory commands will run
WORKDIR /code/

# Put all our code inside that directory that lives in the container
ADD . /code

# Install dependencies
RUN     npm install --global nodemon
RUN     npm install -g bower
RUN     npm install -g grunt-cli
RUN     npm install
RUN     bower install --config.interactive=false --allow-root
RUN     grunt

EXPOSE 8000

ADD run /usr/local/bin/run
RUN chmod +x /usr/local/bin/run

# The command to run our app when the container is run
CMD /usr/local/bin/run