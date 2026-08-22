FROM node:22-alpine

WORKDIR /Backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]