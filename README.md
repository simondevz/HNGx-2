# HNGx-2
## API DOCUMENTATION
### How to Setup Locally
- clone the repository using
  ```
  git clone git@github.com:simondevz/HNGx-2.git
  ```
- run npm install in the root folder
  ```
  npm install
  ```
- Put your database variables in a .env file, like this one
  ```
  PG_USERNAME=postgres
  PG_PASSWORD=1234pickabetterpasswordplease
  PG_HOST=localhost
  PG_PORT=5432
  PG_DB=hng_db
  ```
- start the server using
  ```
  npm run dev
  ```
  or
  ```
  node server.js
  ```

### Enpoints
There are four endpoints as listed below:
- `POST /api` Creates a new User. Take a json object with a name key. Returns the Created User.
- `GET /api/user_id` Gets a user with the id user_id. 
- `PUT /api/user_id` Updates an existing user with the id user_id. Takes a Json Object with a name key. Returns the updated User
- `DELETE /api/user_id` Deletes a User with id user_id. Does not return a value but sends a 204 status code when done.

### Sample Usage
At `/api` pass the following in the body of a post request
```
{
  "name": "Jhon Doe"
}
```
You will get the object of the newly generated user with an Id in it which can be used to test the other routes. 
Assuming it  returns an id of 3

Then at `/api/3` send a get request to retrieve -
```
{
  "id": 3,
  "name": "Jhon Doe"
}
```


At `/api/3` and with a put request pass the following body to update the user
```
{
  "name": "Jhon Jones"
}
```

And to delete the user send a request to `/api/3` using the the delete method
