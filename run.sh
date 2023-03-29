#!/bin/bash

RUN_DOCKER_COMMAND="docker compose -f ./.docker/docker-compose.commands.yml run --rm"
RUN_DOCKER_DEVELOPMENT="docker compose -f ./.docker/docker-compose.development.yml -p development-container-microservice --env-file .env up --remove-orphans"

PS3="Choose an action to perform in this repository:"
options=("setup" "watch" "lint" "test" "run command" "build" "quit")

while true
do
    select opt in "${options[@]}"
    do
        case $opt in
            "lint")
                ARGS="" $RUN_DOCKER_COMMAND lint 
                ;;
            "test")
                read -p "Enter pattern: " pattern
                ARGS="$pattern" $RUN_DOCKER_COMMAND test
                ;;
            "setup")
                docker volume create nodemodules_ms && ARGS="" $RUN_DOCKER_COMMAND install && npm ci
                ;;
            "run command")
                read -p "Enter command: " command
                ARGS="$command" $RUN_DOCKER_COMMAND execute_command
                ;;
            "watch")
                ARGS="" $RUN_DOCKER_DEVELOPMENT
                ;;
            "build")
                ARGS="" prepare && $RUN_DOCKER_COMMAND build
                ;;
            "quit")
                exit 0
                ;;
            *) echo "invalid option $REPLY";;
        esac
        read -p "Press Enter to continue"
        break
  done
done