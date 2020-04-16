#Sample-Api-Server

Sample-Api-Server is a tiny application made with NodeJS that connect to Mongo Db to store users and encrypted passwords. Generate JWT to protect routes with passport

Specifications:

Generate JWT using Mongo DB Database

Structured logging winston

Endpoint example secured with JWT

Web API:

****POST /api/register Create a new user in database and return info about stored user. Body needed: firstName, lastName, email and password

****POST /api/login Check if a user is already registered in mongdoDB and return a JWT. Body needed:  email and password

****GET /api/get/example Request protected with JWT. You should set Authorization header to make this request

Install

First before to start locally you should set two environments:
PORT=<PORT where you want to start server>
MONGO_URI=<Mongo_DB url>

Local:

npm i && npm start
Start locally an sample api server

!TODO Extend Descriptions
