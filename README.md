# DMS

A Data Management System

## Directory structures

    /
    +-- angular
    |   +-- src
    |   |   +-- app                                 // web page source code
    |   |   |   +-- ...
    |   |   |   +-- init
    |   |   |   |   +-- keycloak-init.factory.ts    // keycloak config in angular app
    +-- config
    |   +-- nginx.conf                              // nginx configuration
    +-- docker
    |   +-- Dockerfile.angular                      // build docker image
    +-- keycloak
    |   +-- chatbot.json                            // keycloak realm setting
    +-- docker-compose.yaml                         // docker compose file

## Development

Prerequisites:

- ✅ IDE: VS Code

- ✅ NodeJs

- ✅ Yarn

- ✅ Augular 10+

> If you don't have `yarn` installed, You will need to install via `npm install --global yarn` command.

After cloning this repository, cd into the directory then run `yarn` to download node modules.

For local development, run `yarn start` and navigate browser to `http://localhost:4200/` for the result.

## Deployment

Prerequisites:

- ✅ Docker  and Docker compose 🐋

Clone this repository and change `KEYCLOAK_FRONTEND_URL` to your keycloak reverse proxy then build the image and run containers by executing

    docker-compose up -d --build

## Documentation Reference

- [Angular](https://angular.io/docs)
- [Nebular](https://akveo.github.io/nebular/docs/)
- [Ngx Admin](https://github.com/akveo/ngx-admin)
- [Ng2 Smart Table](https://akveo.github.io/ng2-smart-table/#/documentation)
- [TypeScript](https://www.typescriptlang.org/docs/)