# build stage
FROM node:18.15-alpine as build-stage
WORKDIR /app
COPY dist ./dist

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# CONFIGUTATIONS
# nginx configuration
# ADD $PWD/server-cert/default.conf /etc/nginx/conf.d/default.conf

# keys and certs
# COPY $PWD/server-cert/*.key /etc/ssl/private/
# COPY $PWD/server-cert/*.crt /etc/ssl/certs/
# COPY $PWD/server-cert/dhparam.pem /etc/ssl/certs/
# COPY ssl_passwords.txt /etc/ssl/private/ssl_passwords.txt

EXPOSE 80
# EXPOSE 433

CMD ["nginx", "-g", "daemon off;"]