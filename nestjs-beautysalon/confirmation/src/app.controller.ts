// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/

import { Body, Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
//receives the event about the appointment created and return message of confirmation
  @EventPattern('appointment_created') 
  async confirmation(appointment){
  return console.log("Thank you " + appointment.customerName + "! Your Appointment for " + appointment.treatmentId.name + " was confirmed. It will be on " + appointment.date + " from " + appointment.startTime  + ":00 to " + appointment.endTime  +":00.");
  }


  
}
