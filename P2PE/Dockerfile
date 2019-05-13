FROM alpine
EXPOSE 3000
COPY . /var/www/localhost/htdocs
RUN apk add nodejs && \
    apk add npm && \
    cd /var/www/localhost/htdocs && \
    rm -rf node_modules && \
    rm -rf package-lock.json && \
    apk add g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet

CMD ["npm", "start"]
WORKDIR /var/www/localhost/htdocs