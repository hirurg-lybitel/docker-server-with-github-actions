FROM node:current-alpine AS builder
WORKDIR /workspace

COPY . .

RUN yarn set version stable && \
    yarn workspaces focus --production && \
    yarn build

FROM node:current-alpine AS server
WORKDIR /workspace

RUN npm install pm2 -g

COPY --from=builder /workspace/dist                 dist/
COPY --from=builder /workspace/node_modules         node_modules/
COPY pm2.config.js .

ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY

ENV PM2_PUBLIC_KEY=$PM2_PUBLIC_KEY
ENV PM2_SECRET_KEY=$PM2_SECRET_KEY

ENTRYPOINT ["pm2-runtime", "start", "pm2.config.js", "--env", "production"]
