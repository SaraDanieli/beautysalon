// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';



async function bootstrap() {
     const app = await NestFactory.create(AppModule);

const microservice = app.connectMicroservice({
  transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'confirmation_queue',
        queueOptions: {
          durable: false
        },
  },
});

await app.startAllMicroservices();
await app.listen(3003);
 }
 bootstrap();