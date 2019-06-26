FROM node:10.15.3-jessie
RUN mkdir /code/

ADD ./src/package.json /code/package.json
RUN npm install -g nodemon
RUN npm install --verbose

ADD ./src/ /code/
WORKDIR /code/

# create unprivileged user
RUN adduser --disabled-password --gecos '' deploy