import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {Module} from '@nestjs/common';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {OgmaInterceptor, OgmaModule} from '@ogma/nestjs-module';
import {ExpressParser} from '@ogma/platform-express';
import {RabbitMqParser} from '@ogma/platform-rabbitmq';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
    imports: [RabbitMQModule.forRoot(RabbitMQModule, {
        exchanges: [
            {
                name: 'sample-exchange',
                type: 'topic',
            },
        ],
        uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
        channels: {
            'channel-1': {
                prefetchCount: 15,
                default: true,
            },
        },
    }),
        OgmaModule.forRoot({
            service: {
                color: true,
                json: false,
                application: 'NestJS',
            },
            interceptor: {
                http: ExpressParser,
                ws: false,
                gql: false,
                rpc: RabbitMqParser,
            },
        })],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_INTERCEPTOR,
        useClass: OgmaInterceptor,
    }],
})
export class AppModule {
}
