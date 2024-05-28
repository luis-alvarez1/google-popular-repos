<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Google 10 most popular repositories - REST API

## Server instance running in cloud

-   `http://172.233.27.51:3000/api/repos`

# API Documentation

-   [Postman Documentation](https://documenter.getpostman.com/view/9910504/2sA3QtdB3f)

# Running in Development Mode

1. Clone the repository.
2. Install dependencies using Yarn or NPM:

```
yarn install
```

```
npm install
```

3. Ensure that you have Nest CLI installed:

```
npm i -g @nestjs/cli
```

4. Duplicate the `.env.template` file and rename the copy to `.env`.
5. Fill in the environment variables defined in the .env file.
6. Run the application in development mode with:

```
yarn start:dev
```

## Technology Stack

-   Nest
-   Octokit
-   Docker-compose

# Run with Docker

1. **Optional**: Create the `.env.prod` file.
2. **Optional** Fill the environment variables.
3. Build the new image:

-   With prod environment variables:

```
docker-compose --env-file .env.prod up --build
```

-   Without prod environment variables:

```
docker-compose up --build
```

4. You can also run detached mode with:

-   With prod environment variables:

```
docker-compose --env-file .env.prod up -d
```

-   Without prod environment variables:

```
docker-compose up -d
```

# Testing

To run the tests, use the following command:

```
yarn test
```

```
npm test
```

# Author

-   Luis Alvarez, 31st May - 2024
