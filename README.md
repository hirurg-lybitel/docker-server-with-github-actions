# Deploy server with github actions

This example illustrates how to set up automatic build and deployment of a docker image on your remote server by [GitHub Acions]([url](https://docs.github.com/en/actions)).

View the result on the [demo server](http://213.184.249.125:60103).

There're three main points here:

1.  Node App
2.  GitHub-actions
3.  Remote machine

## Node App

There is a few ways to run app locally:

- by node
```
yarn launch
```
- by pm2
```
yarn pm2:start
```
- by docker
```
docker compose up
```

## GitHub Actions

**Here you need to set several mandatory secrets for your repository (_Settings -> Secrets and variables -> Actions_):**
- **DOCKER_*** - your Docker Hub credentials;
- **DEPLOY_*** - SSH data for connection to your remote machine.

![image](https://github.com/hirurg-lybitel/docker-server-with-github-actions/assets/11502258/8570afe8-0d7e-4c4f-9363-f0d87a3b9bec)


**After push cahnges to github on **main** branch go to Actions tab of your repository:**

![image](https://github.com/hirurg-lybitel/docker-server-with-github-actions/assets/11502258/99166911-6f8d-4340-ac88-62fb88ef0ca7)

**Two tasks will appear here which will:**
1. check your code
2. build a docker image
3. upload it to GitHub Container Registry (GitHub alternative to Docker)
4. connect to your remote server
5. deploy the built image on it


## Remote machine*
*change path _workspace/Yuri/test_ in [docker-deploy.yml](https://github.com/hirurg-lybitel/docker-server-with-github-actions/blob/main/.github/workflows/docker-deploy.yml) to your path.

In addition to setting up ssh and port forwarding, several files are needed here:
- .env
- docker-compose.run.yml
- run_container.sh
  
![image](https://github.com/hirurg-lybitel/docker-server-with-github-actions/assets/11502258/4db9191d-e3f0-48fe-a2da-9df41e440016)

### .env

See [.env.sample](https://github.com/hirurg-lybitel/docker-server-with-github-actions/blob/main/.env.sample) and enter your data.

### docker-compose.run.yml

Docker compose file for creating and running container:

```yml 
version: "3.8"
services:
  server:
    image: ghcr.io/hirurg-lybitel/docker-server-with-github-actions:main    
    build:
      context: .
      dockerfile: Dockerfile
      target: server
      args:
        - PM2_PUBLIC_KEY=${PM2_PUBLIC_KEY}
        - PM2_SECRET_KEY=${PM2_SECRET_KEY}
    container_name: simple_server
    ports:
      - "${PORT}:${PORT}"
    env_file:
      - ./.env
```

### run_container.sh

Bash script for calling docker compose:

```bash
docker compose -f docker-compose.run.yml --env-file .env up -d
```

## PM2 monitoring
After launching project locally [by pm2](#node-app) or deploying it on remote server you will able to monitor your server in [PM2 dashboard](https://id.keymetrics.io/api/oauth/register):

![image](https://github.com/hirurg-lybitel/docker-server-with-github-actions/assets/11502258/090356ff-f230-4b3a-920c-cbb3822a9b94)
