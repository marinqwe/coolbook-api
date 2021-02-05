## Backend for coolbook-client

A simplified facebook-like app, with user registration, login, posts, comments, chat etc.<br />
Frontend code: [coolbook-client](https://github.com/marinqwe/coolbook-client)

### Versions used

```
Node - v15.3.0
Database - postgre with sequelize ORM, should also work with mysql
postgre(pg) - 8.4.1
pg-hstore - 2.3.3
```

### To run

Create your database, add variables.env to the root of the project (check variables.env.example)

Run the migrations to set up your database tables:

```
sequelize db:migrate
```

Run server:

```
npm run dev
```
