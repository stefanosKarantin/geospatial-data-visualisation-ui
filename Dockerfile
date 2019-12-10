# stage: 1
FROM node:8 as react-build
WORKDIR /home/app
COPY . ./
RUN npm i
RUN npm run build

# Stage 2 - the production environment
FROM alpine
COPY --from=react-build /home/app/build /build
ENTRYPOINT ["echo", "running ui"]