// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TreatmentDocument = Treatment & Document;

@Schema()
export class Treatment {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  minduration: number;

  @Prop()
  maxduration: number;

}

export const TreatmentSchema = SchemaFactory.createForClass(Treatment);