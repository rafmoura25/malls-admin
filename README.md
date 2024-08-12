<h1 align="center">
  Mall - Backend
</h1>
<p>Backend application developed in Nest and GraphQL to manage the registration of Stores and Malls</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# integration tests
$ pnpm test:int
```

## Query GraphQL example

```bash
query {
  malls(page: 1, perPage: 1){
    items {
      id
      name
      isActive
      createdAt
    }
    currentPage
    perPage
    lastPage
    total
  }
}
```

## Database and GraphQL local
```bash
# run prisma studio
pnpm prisma studio
http://localhost:5555/

# graphQL playground
http://localhost:3000/graphql

```

# How I Developed the Project

1. Project Setup with NestJS: I created the project using NestJS, following the official [doc](https://docs.nestjs.com/).

2. Editor Configuration and Best Practices: Set up the development environment with recommended editor configurations and coding best practices.

3. Environment Variables Configuration: Configured environment variables to manage sensitive data and environment-specific settings.

4. Testing with Jest: Integrated Jest and set up test scripts to ensure code quality and reliability.

5. Installing and Configuring Prisma ORM: Implemented Prisma ORM for database management, setting it up for seamless database operations.

6. Postgres, Dockerfile, and Docker Compose: Configured PostgreSQL as the database, and created Dockerfile and Docker Compose for containerization.

7. GraphQL Setup: Installed and configured GraphQL for API communication, ensuring efficient and flexible data querying.

8. Implementation of the Mall Module: Developed the mall module, including core functionalities for managing malls.

9. Implementation of Use Cases: Added and integrated the necessary use cases to meet the project’s requirements
