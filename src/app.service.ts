import {AmqpConnection, RabbitRPC} from '@golevelup/nestjs-rabbitmq';
import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

    constructor(private readonly amqpConnection: AmqpConnection) {
    }

    getHello(): string {
        console.log('Received http request');
        return 'Hello World!';
    }

    sendMessageToRabbitMQ() {
        this.amqpConnection.publish('sample-exchange', 'sample-routing-key', {message: 'Hello World!'});
    }

    @RabbitRPC({
        exchange: 'sample-exchange',
        routingKey: 'sample-routing-key',
        queue: 'subscribe-queue',
    })
    public async rpcHandler(msg: {}) {
        console.log(`Received rpc message: ${JSON.stringify(msg)}`);
        return {message: 'hi'};
    }

}
