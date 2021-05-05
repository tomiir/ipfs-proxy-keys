FROM node:14.15.4
WORKDIR /front
COPY package.json .
RUN npm install
RUN npm rebuild node-sass
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]