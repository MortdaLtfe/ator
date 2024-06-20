# Ator

Ator is Authentication API provides the very basic authentication logic.

## Features

1. **User CRUD**
   - Create, Read, Update, and Delete operations for users.

2. **Authentication & Authorization**
   - Basic authentication and authorization mechanisms.

3. **Refresh & Access Token**
   - Handling of refresh and access tokens for session management.

4. **Email Sender**
   - Service to send emails for various purposes such as verification and password reset (coming soon).

5. **Local & Google & GitHub Login**
   - Support for local login, Google login, and GitHub login.

6. **User Verification**
   - Verification process for new users.

## Tools & Technologies

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **TypeORM**: An ORM for TypeScript and JavaScript (ES7, ES6, ES5) based on DataMapper, ActiveRecord, and Identity Map patterns.
- **MySQL**: A relational database management system based on SQL – Structured Query Language.

<img src="https://nestjs.com/img/logo-small.svg" alt="TypeORM" width="100"/>
<img src="https://nodejs.org/static/images/logo.svg" alt="TypeORM" width="100"/>
<img src="https://user-images.githubusercontent.com/30929568/112730670-de09a480-8f58-11eb-9875-0d9ebb87fbd6.png" alt="TypeORM" width="100"/>
<img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" alt="TypeORM" width="100"/>


## Configurtion env file
- create file and name it `config.env`
```env
DATABASE_PORT=
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_NAME=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
WEBSITE_URL=http://

GOOGLE_SECRET_ID=
GOOGLE_CLIENT_ID=

MAIL_HOST=smtp.office365.com
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=

SERVER_PORT=8080
```

## Start server
- Make sure you are using mysql database, turn it on 
- use `npm i`
- enter `npm run start:dev`
<img src="https://fs4.fastupload.io/cache/plugins/filepreviewer/350030/9876bed42839f39d9dee27d9648c5ab0e7411810101ddb18478b990b59f64be8/280x280_middle.jpg" alt="start server"/>
