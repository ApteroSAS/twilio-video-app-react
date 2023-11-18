FROM node:18-alpine

ENV PORT 8194
EXPOSE 8194

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY ./src ./src
COPY ./dockflow.json ./
RUN npm run build

#RUN npm run test

CMD ["node", "dist/"]
