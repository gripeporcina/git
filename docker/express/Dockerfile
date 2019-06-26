FROM node:10.15.3-jessie
RUN mkdir /code/

ADD ./src/package.json /code/package.json
RUN npm install -g nodemon
RUN npm install -g react-scripts
RUN npm install -g concurrently
RUN npm install --verbose

ADD ./src/ /code/
RUN cd /code/client && npm install
WORKDIR /code/

# create unprivileged user
RUN adduser --disabled-password --gecos '' deploy