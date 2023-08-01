FROM node:18.12.1

WORKDIR /app

COPY ./package.json ./
RUN npm i -f
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]