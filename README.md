Blogging API

To Use:

1. Clone to your server.
2. Create a .env file with two variables: 'DATABASE_URL' and 'JWT_SECRET'.
3. Database URL is your database's secret URL. JWT secret can be any string you want.
4. In terminal, 'npm i' -> 'npx drizzle-kit generate' -> 'npx drizzle-kit migrate' to get your database ready.
5. To start the API server, 'npm run dev'.
6. Endpoints:

-- /auth

<register>
--- /register 
---- POST req.
---- req.body should have 'email', 'name', 'password'.
---- returns token.
---- put token in header -> Authorization.

<login>
--- /login 
---- POST req.
---- req.body should have 'email', 'password'.
---- returns token.
---- put token in header -> Authorization.

-- /blog

<create>
--- /
---- POST req.
---- req.body should have 'content', 'title'.
---- returns json of newBlog.
---- userId is taken from header token.
---- auth required

<read page>
--- /page?limit={limit}&offset={offset}
---- GET req.
---- req.params should have 'limit', 'offset'.
---- default 'limit' = 100, 'offset' = 0.
---- returns array of json of all blogs after the offset and within limit.
---- no auth required.

<read single>
--- /{id}
---- GET req.
---- id should be a valid UUID of the blog to be read.
---- returns json of blog if found else status 204.
---- no auth required.

<read by user>
--- /search/user
---- POST req.
---- req.body should have 'userId'.
---- returns array of json of all blogs of user if found else status 204.
---- no auth required.

<read by title>
--- /search/title
---- POST req.
---- req.body should have 'title'.
---- returns array of json of all blogs of same title if found else status 204.
---- no auth required.

<update>
--- /{id}
---- PUT req.
---- req.body can have feilds 'title', 'content'.
---- id should be a valid UUID of the blog to be updated.
---- user should be the one who created the blog else status 401
---- returns json of updated blog if blog and user found else status 404.
---- auth required.

<delete>
--- /{id}
---- DELETE req.
---- id should be a valid UUID of the blog to be deleted.
---- user should be the one who created the blog else status 401
---- returns status 204 if deleted else status 404.
---- auth required.

--/comment
<create>
--- /
---- POST req.
---- req.body should have 'content', 'blogId'.
---- returns json of newComment.
---- userId is taken from header token.
---- auth required

<read by blog>
--- /blog/{id}
---- GET req.
---- id should be a valid UUID of the blog whose comments are to be read.
---- returns array of json of all comments if found else status 204.
---- no auth required.

<read by user>
--- /blog/{id}
---- GET req.
---- id should be a valid UUID of the user whose comments are to be read.
---- returns array of json of all comments of user if found else status 204.
---- no auth required.

<update>
--- /{id}
---- PUT req.
---- req.body can have feilds 'content'.
---- id should be a valid UUID of the comment to be updated.
---- user should be the one who created the comment else status 401
---- returns json of updated comment if comment and user found else status 404.
---- auth required.

<delete>
--- /{id}
---- DELETE req.
---- id should be a valid UUID of the comment to be deleted.
---- user should be the one who created the blog else status 401
---- returns status 204 if deleted else status 404.
---- auth required.
