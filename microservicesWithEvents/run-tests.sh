#!/bin/bash

docker exec -t golang_microservices gotestsum --format testname
