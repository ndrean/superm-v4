FROM node:14-alpine3.12 as builder
ENV NODE_ENV=production
WORKDIR /react-app
COPY ./frontend/package.json ./frontend/yarn.lock ./
RUN yarn --cwd ./frontend install --production \
   && mv node_modules ./react-app
COPY . .
RUN yarn --cwd ./frontend build

# to keep it running and have time to visit it :)
CMD ["tail", "-f", "/dev/null"] 


FROM nginx:1.19.6-alpine
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
COPY --from=builder ./react-app/frontend/build ./
RUN rm /var/log/nginx/access.log \ 
   && rm /var/log/nginx/error.log \ 
   && ln -s /dev/stdout /var/log/nginx/access.log \
   && ln -s /dev/stderr /var/log/nginx/error.log  \
   && rm /etc/nginx/conf.d/default.conf

COPY frontend/webserver/build.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
STOPSIGNAL SIGQUIT
