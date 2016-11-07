# This image will be based on the official nodejs docker image
FROM node:latest

# Set in what directory commands will run
WORKDIR /code/

# Put all our code inside that directory that lives in the container
ADD . /code/

# Move our installation dependency files to the directory where installation will run
ADD .bowerrc /code/.bowerrc

# Install dependencies
RUN npm install
RUN npm install -g bower
RUN bower install --config.interactive=false --allow-root

EXPOSE 8000

# The command to run our app when the container is run
CMD node server/app.js