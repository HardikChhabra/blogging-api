
# Blogging-API

An API to create an authenticated blogging application, where users can create blogs, look them up, comment over them and if anything goes wrong, delete them too.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`DATABASE_URL` Secret url to your database.

`JWT_SECRET` Secret string key.


## Run Locally

Clone the project

```bash
  git clone https://github.com/HardikChhabra/blogging-api.git
```

Go to the project directory

```bash
  cd blogging-api
```
`Make sure you have the .env file`

Install dependencies

```bash
  npm install
```

Generate and Migrate to your database
```bash
  npm drizzle-kit generate
  npm drizzle-kit migrate
```
Start the server

```bash
  npm run dev
```

# API Endpoints

## Authentication

| Endpoint      | Method | Body Parameters                 | Auth Required | Response                  |
|--------------|--------|--------------------------------|--------------|---------------------------|
| `/auth/register` | POST   | `email`, `name`, `password`  | No           | Returns token             |
| `/auth/login`    | POST   | `email`, `password`         | No           | Returns token             |

Put the token in `header` -> `key:Authorization, value:token`
## Blog

| Endpoint                 | Method | Body Parameters        | Query Params                   | Auth Required | Response                         |
|--------------------------|--------|------------------------|--------------------------------|--------------|----------------------------------|
| `/blog/`                 | POST   | `content`, `title`     | None                           | Yes          | Returns new blog JSON           |
| `/blog/page`             | GET    | None                   | `limit` (default: 100), `offset` (default: 0) | No | Returns array of blogs          |
| `/blog/{id}`             | GET    | None                   | None                           | No           | Returns blog JSON or status 204 |
| `/blog/search/user`      | POST   | `userId`               | None                           | No           | Returns user's blogs or status 204 |
| `/blog/search/title`     | POST   | `title`                | None                           | No           | Returns blogs with title or status 204 |
| `/blog/{id}`             | PUT    | `title`, `content`     | None                           | Yes          | Returns updated blog JSON or status 404 |
| `/blog/{id}`             | DELETE | None                   | None                           | Yes          | Returns status 204 or status 404 |

## Comments

| Endpoint                 | Method | Body Parameters  | Auth Required | Response                          |
|--------------------------|--------|-----------------|--------------|-----------------------------------|
| `/comment/`             | POST   | `content`, `blogId` | Yes          | Returns new comment JSON         |
| `/comment/blog/{id}`    | GET    | None            | No           | Returns blog's comments or status 204 |
| `/comment/user/{id}`    | GET    | None            | No           | Returns user's comments or status 204 |
| `/comment/{id}`         | PUT    | `content`       | Yes          | Returns updated comment JSON or status 404 |
| `/comment/{id}`         | DELETE | None            | Yes          | Returns status 204 or status 404 |

