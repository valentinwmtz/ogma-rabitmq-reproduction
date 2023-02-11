## Description

TypeError: Cannot read properties of undefined (reading 'setRequestId') when using '@golevelup/nestjs-rabbitmq and ogma
rabbitMq interceptor

## How to reproduce

1. `npm install`
2. `docker-compose up`
3. `npm run start:dev`
4. `curl -X POST http://localhost:3000/` (also available in app.http)

## Expected behavior

No error

## Actual behavior

Error when rpcHandler is called