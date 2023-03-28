### MAKEFILE VARIABLES
RUN_DOCKER_COMMAND := docker compose -f ./.docker/docker-compose.commands.yml run --rm
RUN_DOCKER_DEVELOPMENT := docker compose -f ./.docker/docker-compose.development.yml -p development-container-microservice --env-file .env up --remove-orphans

### COMMANDS FOR LOCALLY TESTING, LINTING
lint:
	ARGS="" $(RUN_DOCKER_COMMAND) lint 
test:
	ARGS="$(pattern)" $(RUN_DOCKER_COMMAND) test

### SETTING UP ENVIRONMENT FOR DEVELOPMENT
setup:
	docker volume create nodemodules_ms && make install

### DEVELOPMENT COMMANDS
install:
	ARGS="" $(RUN_DOCKER_COMMAND) install && npm ci
execute:
	ARGS="$(command)" $(RUN_DOCKER_COMMAND) execute_command
watch:
	ARGS="" $(RUN_DOCKER_DEVELOPMENT)
build:
	ARGS="" make prepare && $(RUN_DOCKER_COMMAND) build