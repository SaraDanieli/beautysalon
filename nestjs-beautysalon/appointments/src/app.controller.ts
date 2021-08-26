// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/

import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAppointmentDto } from './create-appointment.dto';
import { Appointment } from './appointments.schema';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateTreatmentDto } from './create-treatment.dto';

@Controller('appointments')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('CONFIRMATION_SERVICE') private readonly client: ClientProxy,
    ) {}

  //get a list of all the appointments
    @Get()
  async getAllAppointments():Promise<Appointment[]> {
    return this.appService.getAllAppointments();
  }


//create an appointment
  @Post()
  async createAppointment(@Body() createAppointmentDto:CreateAppointmentDto) {
   
  const appointment= await this.appService.createAppointment(createAppointmentDto);

   this.client.emit('appointment_created', appointment);

   return appointment;
    
  } 
  
//get an appointment by id

  @Get(':id')
  async getAppointmentById(@Param('id') id:string) {
    return await this.appService.getAppointmentById(id);
  }


//received the message from the treatment service that a treatment has been created

  @EventPattern('treatment_created')
  async treatment(@Body()createTreatmentDto:CreateTreatmentDto) {
     this.appService.createTreatment(createTreatmentDto);
  }


}
