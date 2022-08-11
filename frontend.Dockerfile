FROM node:lts-alpine3.16 as builder

WORKDIR /app

COPY frontend/ .

RUN npm install

RUN npm run build


FROM nginx:1.21.0-alpine

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]