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
import { Appointment, AppointmentDocument } from './appointments.schema';
import { CreateAppointmentDto } from './create-appointment.dto';
import { Treatment, TreatmentDocument } from './treatments.schema';

@Injectable()
export class AppService {
  
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Treatment.name) private treatmentModel: Model<TreatmentDocument>
  ) {}
  
  
  async getAllAppointments(): Promise<Appointment[]>{
    return this.appointmentModel.find().populate('treatmentId', 'name').exec();
  }

  async getAppointmentById(id:string):Promise<Appointment> {
    return this.appointmentModel.findOne({id}).exec();
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto):Promise<Appointment> {
    const newAppointment = await new this.appointmentModel(createAppointmentDto).save();
    const newAppointmentPopulated = await this.appointmentModel.findById(newAppointment._id).populate('treatmentId', 'name').exec();
    return  newAppointmentPopulated ;
  }

  async createTreatment(data):Promise<Treatment> {
    return new this.treatmentModel(data).save();
  }

}
