# Project description
 A task management project aids users in organizing, prioritizing, and tracking tasks, assignments, and deadlines, with basic systems incorporating features like:

- Here work on both backend(Node.js) and frontent(react.js) using typescript  
- In Project we doing task management where user login and got to dashboard create task when task complete they click the complete task and it go to complete task list or it leave in pending list
- in pending list user can update the task or delete the task
- In dashboard we can filter the task or search the task

# Setup Instructions

## clone the git
  git clone https://github.com/zoroworld/task-management.git

## Client folder
  - cd client
  - npm install 
  - npm run dev

## Server folder
  - cd server
  - npm install
  - npm start

## no need for setup db
  - it is in mongodb atlass cloud cluster




# API testing information

Open postman

## for user API

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
## for task API

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

- to get api post man instead http://localhost:8080 use  https://task-management-lyart-beta.vercel.app 


# Deployment
- frontend :-https://task-management-pi-taupe.vercel.app/login
- backend :- https://task-management-lyart-beta.vercel.app




