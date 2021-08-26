// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Treatment} from './treatments.schema';
import * as mongoose from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop()
  id: number;

  @Prop()
  customerName: string;

  @Prop()
  date: string;

  @Prop()
  startTime: number;

  @Prop()
  endTime: number;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Treatment'})
  treatmentId: Treatment;

 
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);