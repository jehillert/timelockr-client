# pull official base image
FROM node:15.10.0
# set working directory
WORKDIR /usr/src/app
# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH
# install dependencies
COPY package.json ./
# COPY package-lock.json ./
RUN npm install --force
# Copies everything over to Docker environment
COPY . ./
# Uses port which is used by the actual application
EXPOSE 8080
# build app
# RUN npm run build
# start app
CMD ["npm", "run", "start"]
# CMD ["npm", "run", "start"]
