// SENECA version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/


const mongoose = require('mongoose')

//connect to MongoDB through mongoose
mongoose.connect("mongodb://mongoDB:27017/appointmentsDBseneca", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//-----to run locally without docker----
// mongoose.connect("mongodb://localhost:27017/appointmentsDBseneca" */ , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });


const appointmentSchema = new mongoose.Schema({
  id: Number,
  customerName: String,
  date: String,
  startTime: Number,
  endTime: Number,
  treatmentName: String,
  treatmentId: Number
});

const Appointment = mongoose.model("Appointment", appointmentSchema)




require('seneca')()
  .listen({
    host: "appointments",
    port: 9003,
    pin: 'role:appointments'
  }, () => {
    console.log('Appointment microservice started on port 9003...')
  })
  //the client allowed the microservice to send messages
  .client({
    host: "treatments",
    port: 9002,
    pin: 'role:treatment'
  })
  .client({
    host: "confirmation",
    port: 9004,
    pin: 'role:confirm'
  })

// ---- to run locally without docker
  // .listen({
  //   port: 9003,
  //   pin: 'role:appointments'
  // }, () => {
  //   console.log('Appointment microservice started on port 9003...')
  // })
  // //the client allowed the microservice to send messages
  // .client({
  //   port: 9002,
  //   pin: 'role:treatment'
  // })
  // .client({
  //   port: 9004,
  //   pin: 'role:confirm'
  // })

  
//-------Seneca actions to be executed when receiving messages matching the patterns-----

  //list all the appointments
  .add('role:appointment,cmd:list', function(msg, respond) {
    Appointment.find({}, respond)

  })


  //find one appintment
  .add('role:appointment,cmd:load', function(msg, respond) {
    // respond(console.log(msg))
    //this.make( 'product' ).load$( msg.id, respond )
    Appointment.findOne({
      id: msg.args.params.id
    }, respond)

  })


  //create one appointment
  .add('role:appointment,cmd:create', function(msg, respond) {
    //console.log(msg)
    this.act('role:treatment, cmd:id', {
      treatmentId: msg.treatmentId
    }, function(err, treatment) {

      var treatmentName = treatment.name
      var treatmentId = treatment.id

      const appointment = new Appointment({
        id: msg.id,
        customerName: msg.customerName,
        date: msg.date,
        startTime: msg.startTime,
        endTime: msg.endTime,
        treatmentName: treatmentName,
        treatmentId: treatmentId
      });


      appointment.save(respond)

      // send the message to the confirmation service that the appointment has been made
      this.act('role:confirm, cmd:appointment', {
        appointment: appointment
      })

     





    })









  })
