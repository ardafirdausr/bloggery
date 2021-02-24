FROM node:14.15.5
COPY . /app
WORKDIR /app
RUN npm install --production
ENTRYPOINT [ "npm", "run", "start" ]
