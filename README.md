# Restaurant Management System

## Personal Over View

### steps to start the project on the local machine

    1. Check docker (docker desktop) is installed on your machine.
    2. Check Node js is installed on your machine.
    3. clone the projects repo to your local machine.
    4. open the project folder and run the following commands:
        a. run "docker compose up -d " -> for create the docker image and to run the container.
        (this command will create init the database "init" file to create the right tables in the database for this project.)
        
        b. run "npm run dev" to start the connections and to be able to send requests to the server. (allows auto start after changes are made.)
    5. Finally, check that the connection to the server and the database is up and your are ready.


### Technical Aspects
The system is built using JavaScript, Node js Express, for creating the RESTful APIs.
For the data the system uses PostgreSQL to save all the data in database tables.
In that way the data is kept safe after the user stop the program and not been deleted like in-memory.


### DataBase Schema

![image](https://github.com/tomerramon/bisbis10_typescript/assets/80204348/4ff4ec8d-2123-4cfe-84e0-aa974783e70f)
  
## Overview

The bisbis10 restaurant management system is a backend service designed to handle various operations related to restaurants, their dishes, and ratings. The system aims to provide a comprehensive platform for managing restaurant data, including details about the restaurants, their cuisines, dishes, and customer ratings.

## Functionality

The system provides the following APIs:

- **Restaurants API**: Manages restaurant data.
- **Ratings API**: Manages customer ratings for restaurants.
- **Dishes API**: Manages the dishes offered by each restaurant.

## Technical Aspects

The system is built using Express, leveraging its robust framework for creating RESTful APIs. Data persistence can be managed using an in-memory database for simplicity, or a more robust solution like PostgreSQL for production.

## Homework Task

Candidates are expected to design and implement the above APIs, adhering to RESTful principles.

## APIs

### Restaurants APIs
| API Description           | Endpoint                | Request Body                                             | Response Status | Response Body                                                                                           |
|---------------------------|-------------------------|----------------------------------------------------------|-----------------|--------------------------------------------------------------------------------------------------------|
| Get all restaurants       | GET /restaurants        |                                                          | 200 OK          | [{"id": "1","name": "Taizu","averageRating" : 4.83,"isKosher" : false,"cuisines": ["Asian","Mexican","Indian"]}] |
| Get restaurants by cuisine| GET /restaurants?cuisine={cuisine} |                                                         | 200 OK          | [{"id": "1","name": "averageRating","rating" : 4.83,"isKosher" : false,"cuisines": ["Asian","Mexican","Indian"]}] |
| Get restaurant            | GET /restaurants/{id}      |                                                          | 200 OK          | {"id": "1","name": "Taizu","averageRating" : 4.83,"isKosher" : false,"cuisines": ["Asian","Mexican","Indian"],"dishes": [{"id": "1","name": "Noodles","description": "Amazing one","price": 59}]} |
| Add a restaurant          | POST /restaurants       | {"name": "Taizu","isKosher": false,"cuisines": ["Asian","Mexican","Indian"]} | 201 CREATED     |                                                                                                        |
| Update a restaurant       | PUT /restaurants/{id}     | {"cuisines": ["Asian"]}                                 | 200 OK          |                                                                                                        |
| Delete a restaurant       | DELETE /restaurants/{id}    |                                                          | 204 No Content  |                                                                                                        |

### Ratings APIs

| API Description           | Endpoint               | Request Body                          | Response Status | Response Body |
|---------------------------|------------------------|---------------------------------------|-----------------|---------------|
| Add a restaurant rating   | POST /ratings          | {"restaurantId": 2, "rating":3.3}     | 200 OK          |               |

### Order APIs


| API Description           | Endpoint               | Request Body                          | Response Status | Response Body |
|---------------------------|------------------------|---------------------------------------|-----------------|---------------|
| Order    | POST /order          | {"restaurantId": 2, "orderItems":[{"dishId":12,"amount":1},{"dishId":14,"amount":1} ]} ]  | 200 OK          |  {orderId:"ef401fc8-d545-424b-928d-4789cd47bb6e"}             |

### Dishes APIs

| API Description           | Endpoint                | Request Body                             | Response Status | Response Body                                                     |
|---------------------------|-------------------------|------------------------------------------|-----------------|------------------------------------------------------------------|
| Add a dish                | POST /restaurants/{id}/dishes | {"name":"Shakshuka","description":"Great one","price": 34} | 201 CREATED     |                                                                  |
| Update a dish             | PUT /restaurants/{id}/dishes/{dishId} | {"description":"Great one","price": 34} | 200 OK          |                                                                  |
| Delete a dish             | DELETE /restaurants/{id}/dishes/{dishId} |                                        | 204 No Content  |                                                                  |
| Get dishes by a restaurant| GET /restaurants/{id}/dishes  |                                         | 200 OK          | [{"id":"1","name":"Humus","description":"Good one","price": 48}] |

## Jump Start

For your convenience, docker-compose.yml includes Postgresql DB, the app is already pointing to this connection. In addition, you have the schema and data SQL files that can setup your DB schema and init data.

## Prerequisite

1. Node - https://nodejs.org/en
2. Docker - https://www.docker.com/products/docker-desktop/

## Instructions

1. Fork this repo to your GitHub account.
2. Clone it to your local machine.
3. Complete the task.
4. On completion, send your repo link to the rm-tdpisraelhomework@intl.att.com email, (a snapshot will be taken from your repo once you submit the homework). please do not update your repo after you submit the homework.
