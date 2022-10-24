#!/bin/bash
cd ".\frontend"
start npm run serve -- --port 8081
cd "..\backend"
./mvnw spring-boot:run
