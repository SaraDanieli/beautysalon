// SENECA version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/



require( 'seneca' )()
  
  .listen( {host: "confirmation", port:9004, pin:'role:confirm' }, () => {
    console.log('Confirmation microservice started on port 9004...')
  } )

  // ---- to run locally without docker----
  // .listen( {port:9004, pin:'role:confirm' }, () => {
  //   console.log('Confirmation microservice started on port 9004...')
  // } )


  .add( 'role:confirm ,cmd:appointment', function( msg, respond ) {
     
    respond(console.log("Thank you " + msg.appointment.customerName + "! Your Appointment for " + msg.appointment.treatmentName + " was confirmed. It will be on " + msg.appointment.date + " from " + msg.appointment.startTime  + ":00 to " + msg.appointment.endTime  +":00."))
       })