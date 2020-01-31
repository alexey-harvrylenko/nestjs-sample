FROM node:12.13.0

ENV HOME_DIR /home/node
ENV DIR $HOME_DIR/sample

WORKDIR $DIR
EXPOSE 3000

COPY . $DIR

RUN npm i -g @nestjs/cli \
    && yarn \
    && npm run build

USER node

CMD ["npm", "run", "start:prod"]