# stage: 1
FROM node:8 as react-build

WORKDIR /app

COPY . /app

RUN npm i
RUN npm run build

FROM alpine:latest

COPY --from=react-build /app/build /app
