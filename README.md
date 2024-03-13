<p align="center">
  <h2>Jupiter</h2>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/NodeJS-v18-green.svg" alt="NodeJS Version" />
    <img src="https://img.shields.io/badge/NestJS-10.0.0-orange.svg" alt="NestJS" />
</p>

## Description
Jupiter is a backend API that provides Star Wars movie data. The data is sourced from [Swapi](https://swapi.py4e.com/api/), a Star Wars API that provides data about various aspects of the Star Wars universe such as films, characters, starships, and more.


## Documentation
Jupiter is hosted on Render at [Docs](https://jupiter-1.onrender.com/docs). This documentation provides more detailed information about the API, including how to use it, what data it provides, and any other features or requirements.

## Features
- Movies list
- Characters list
- Comment list
- Comment creation

## Installation

### Node
```bash
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Docker
```bash
$ docker-compose up
```

## Environment Variables

```bash
### Database
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_LOGGING=true

### Port
APP_PORT=3000

### Swapi
SWAPI_URL=https://swapi.py4e.com/api
```
