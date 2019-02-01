Users App Server

### Stack
* [NodeJS](https://nodejs.org/en/about/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [TypeScript 3](https://www.typescriptlang.org)
* [ESLint](https://eslint.org)
* [TSLint](https://palantir.github.io/tslint)


### Run app
npm i
mongod
npm run build:live
app start on localhost:8000

### Dev mode
npm i
mongod
npm run dev
app start on localhost:8000


"start": "npm run build:live",
    "dev": "tsc --watch & nodemon dist",
    "build": "tsc",
    "build:live": "nodemon dist",
    "lint": "eslint src --ext ts",
    "tsc": "tsc"


### API

#### Authorisation
HTTP | Url | Description | Input params | Output params
|---|---|---|---|---|
| POST | /auth/signin | Login in app | (string) email, (string) password | -
| POST | /auth/signup | Registry in app | (string) name, (string) email, (string) password, ('male', 'female') sex, (boolean) isBlocked, (date) birthday | (boolean) auth, (string) accessToken


####User
Need jwt token in header 'Authorisation'

HTTP | Url | Description | Input params | Output params
|---|---|---|---|---|
| GET | /users/getUser | Get user data | (string) authUserId | User
| PATCH | /users/editUser | Edit user data | User | User
| GET | /users/getUsersList | Get user list | - | [User]

User:
```
{
    "id": string,
    "name": string,
    "birthday": date,
    "sex": 'male' || 'female',
    "email": string,
    "isBlocked": boolean
}