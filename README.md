# docker-express-typescript-microservice

Small example of a microservice written in nodeJS utilising typescript and express

## Features

- OpenAPI validation
- Completely typed
- Decorators
- DDD approach
- MongoDB

## Layers

| Layer name         | Responsible file   | Utilises                |
| ------------------ | ------------------ | ----------------------- |
| Presentation layer | controllers/\*.ts  | DTOs (DTOs/\*.ts)       |
| Domain layer       | service/\*.ts      | Mappers (mappers/\*.ts) |
| Data layer         | repositories/\*.ts | Models (models/\*.ts)   |

## This project is WIP

To be added:

- MongoDB schema validation by using TS interfaces
- OpenAPI generation from code

To be fixed:

- Make data repository functions "getByValue" and "getByValues" accept keys of entity only 
