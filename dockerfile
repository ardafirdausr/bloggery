FROM node:14.15.5
COPY package.json yarn.lock /app/
RUN npm install --production
COPY . /app
WORKDIR /app
ENTRYPOINT [ "npm", "run", "start" ]
