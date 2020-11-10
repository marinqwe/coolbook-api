# Nodejs API for coolbook-client
### -a simple, facebook-like app, with user login, registration, posts etc. (more features coming)

### What is used
```
Node - 12.16.3
Database - postgre with sequelize ORM, should also work with mysql
postgre(pg) - 8.4.1
pg-hstore - 2.3.3
```

### How it's used

Create your database, add variables.env to the root of the project (check variables.env.example)

Run the migrations to set up your database tables:
```
sequelize db:migrate
```

Run server:
```
npm run dev
```

If you want to undo migrations:
```
sequelize db:migrate:undo (only for last migration)
sequelize db:migrate:undo:all (all migrations)
sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js (revert all up to this file)
```
