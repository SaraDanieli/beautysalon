// NESTJS version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/

import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTreatmentDto } from './create-treatment.dto';
import { Treatment } from '././treatments.schema';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('treatments')
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('APPOINTMENTS_SERVICE') private readonly client: ClientProxy
    ) {}

  
  
  //get a list of all the treatments 
    @Get()
  async getAllTreatments():Promise<Treatment[]> {
    return this.appService.getAllTreatments();
  }

  //create a treatment 
  @Post()
  async createTreatment(@Body() createTreatmentDto:CreateTreatmentDto) {
    
    const treatment = await this.appService.createTreatment(createTreatmentDto);

    //send a message with the treatments detail to inform the appointments service 
    this.client.emit('treatment_created', treatment);

    return treatment;
  } 


//get a treatment by id 
  @Get(':id')
  async findTreatmentById(@Param('id') id:string) {
    return await this.appService.findTreatmentById(id);
  }


  

  

}
