// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTreatmentDto } from './create-treatment.dto';
import { Treatment, TreatmentDocument } from './treatments.schema';

@Injectable()
export class AppService {
  
  constructor(@InjectModel(Treatment.name) private treatmentModel: Model<TreatmentDocument>) {}
  
  
  async getAllTreatments(): Promise<Treatment[]> {
    return this.treatmentModel.find().exec();
  }

  async findTreatmentById(id:string):Promise<Treatment> {
    return this.treatmentModel.findOne({id}).exec();
  }

  async createTreatment(createTreatmentDto: CreateTreatmentDto):Promise<Treatment> {
    return new this.treatmentModel(createTreatmentDto).save();
  }
}
