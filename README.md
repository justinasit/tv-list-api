# TV-List (API) Overview

- This application allows you to register, login and store or archive TV series. 
- It is primarily used as an API for tv-list (https://github.com/justinasit/tv-list) app.
- Application is written in NodeJS and uses ExpressJS framework.
- MongoDB is being used as a database.
- The app is set up to be deployed to AWS Lambda by using Serverless.

# Prerequisites:

- Node & Yarn

# Set up TV-List:

1. Clone tv-list-api repository.
2. Run `yarn` to install all dependencies.
4. Copy `.env.example` file and name it `.env`.
5. Fill in the JWT and database details in the `.env` file.
6. Use `yarn start` to run the app.
7. Application can be consumed by an API client (Postman, Insomnia etc.) or by hooking up the front-end TV-List app.
