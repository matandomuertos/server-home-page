# server-homepage
NodeJS + React (kinda ERN, without M, because I see no sense to run MongoDB) homepage for home servers with ability to start/pause/restart/stop Docker containers.
If you have multiple apps running in your server, server-homepage offers a simple way to access all of them and manage the docker containers where they are running.

## CRUD apps data
Apps data is stored [here](https://github.com/matandomuertos/server-home-page/blob/main/frontend/src/components/AppBox.js#L9), after modify it, compile the app.

## How to build images

### Backend

`docker build -f backend.Dockerfile -t server-homepage-backend .`

### Frontend

`docker build -f frontend.Dockerfile -t server-homepage-frontend .`

## How to run
As simple as use [docker-compose](https://docs.docker.com/compose/): `docker-compose up -d`

## How to test it easy and fast
By default the app is watching container with name `plex`, `utorrent` and `test123`, it's possible to deploy a sample version of uTorrent and Plex adding these lines to `docker-compose.yaml`:
```
  utorrent:
    image: ekho/utorrent:latest
    container_name: utorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Warsaw
    ports:
      - 8081:8080
    restart: unless-stopped

  plex:
    container_name: plex
    image: plexinc/pms-docker:latest
    restart: unless-stopped
    environment:
      - TZ=Europe/Warsaw
    network_mode: host
```
After run `docker-compose up -d`, server-homepage will be running along Plex and uTorrent, so you will be able to manage those 2 apps from the web UI.