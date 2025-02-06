# Project description
 A task management project aids users in organizing, prioritizing, and tracking tasks, assignments, and deadlines, with basic systems incorporating features like:

- Here work on both backend(Node.js) and frontent(react.js) using typescript  
- In Project we doing task management where user login and got to dashboard create task when task complete they click the complete task and it go to complete task list or it leave in pending list
- in pending list user can update the task or delete the task
- In dashboard we can filter the task or search the task

# Setup Instructions

## Node
- npm init -y 
- npm install typescript --save--dev
- npm i -D @types/node 
- npm install -D ts-node
- npm install -D nodemon
- npm i express body-parser cookie-parser compression cors
- npm i -D @types/express @types/body-parser @types/cookie-parser @types/compression @types/cors
- npm install mongoose
- npm i -D  @types/mongoose
- npm install bcryptjs
- npm i -D @types/ bcryptjs
- npm install dotenv 
- npm install @types/dotenv
- npm install cqrs

## React
- npm create vite@latest
- select react
- select typescript + src
- here see all tailwind setup for vite
  https://tailwindcss.com/docs/installation/using-vite



# API testing information

Open postman

## for user

POST http://localhost:8080/api/auth/signup

in postman body 

{
  "name": "rema",
  "address": "1234 Elm Street, SomeCountry",
  "phone": "9778956455",
  "email": "rema@example.com",
  "password": "rema"
}

POST http://localhost:8080/api/auth/login

in postman body 

{
  "email": "silpa@example.com",
  "password": "silpa"
}
## for task

http://localhost:8080/api/tasks/

In postman header put (GET, POST, PUT, DELETE)

key:Authorization
value:Bearer <Token Key>

GET http://localhost:8080/api/tasks/

POST http://localhost:8080/api/tasks/

in postman body 

{
  "title": "Task Title 3",
  "description": "Description of the task 3",
  "status": "pending"
}

DELETE http://localhost:8080/api/tasks/taskId

in postman body 

{
  "title": "Task Title 2",
  "description": "Description of the task 2",
  "status": "pending",
  "user": "67a26dabd38adfb808233019"
}

PUT http://localhost:8080/api/tasks/taskId

in postman body 

{
  "title": "Task Title 32",
  "description": "Description of the task 3",
  "status": "completed"
}





