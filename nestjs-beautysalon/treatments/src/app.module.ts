// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Treatment, TreatmentSchema } from './treatments.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongoDB:27017/treatmentsDB'),
    MongooseModule.forFeature([{ name: Treatment.name, schema: TreatmentSchema }]),
    ClientsModule.register([
      {
        name: 'APPOINTMENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'appointments_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
