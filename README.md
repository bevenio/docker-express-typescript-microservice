# docker-express-typescript-microservice

Small example of a microservice written in nodeJS utilising typescript and express

## Features

- OpenAPI validation
- Completely typed
- Decorators

## Layers

| Layer name      | Responsible file   | Utilises                |
| --------------- | ------------------ | ----------------------- |
| Transport layer | controllers/\*.ts  | DTOs (DTOs/\*.ts)       |
| Service layer   | service/\*.ts      | Mappers (mappers/\*.ts) |
| Data layer      | repositories/\*.ts | Models (models/\*.ts)   |

## This project is WIP

To be added (maybe):

- Docker Wrapper / Image building
