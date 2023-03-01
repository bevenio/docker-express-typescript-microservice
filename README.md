# docker-express-typescript-microservice

Small example of a micro service written in nodeJS utilising typescript and express

## Layers

| Layer name| Responsible file| Utilises |
|----------|-----------------|---------|
| Transport layer | controllers/*.ts | DTOs |
| Service layer | service/*.ts | Converters (converters/*.ts)|
| Data layer | repositories/*.ts | Models (models/*.ts)|

## This project is WIP

To be added (maybe):

- Webpack for node
- Docker Wrapper / Image building