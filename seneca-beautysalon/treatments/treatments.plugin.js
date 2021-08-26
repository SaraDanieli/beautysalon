// SENECA version implementation of the original benchamark application Beauty Salon borrowed from 
/* 

Sailer, I., Lichtenthäler, R., & Wirtz, G. (2021). An Evaluation of Frameworks for Microservices Development.
Communications in Computer and Information Science, 
1360, 90–102. https://doi.org/10.1007/978-3-030-71906-7_8 

Github code repository of Beauty Salon implemented with Moleculer: https://github.com/IsabellSailer/ms-framework-comparison/tree/master/Implementations/Moleculer


*/



const mongoose = require ('mongoose')

// ---- runs with docker ----
mongoose.connect("mongodb://mongoDB:27017/treatmentsDBseneca", {useNewUrlParser:true, useUnifiedTopology: true});


// to run locally without docker 
// mongoose.connect("mongodb://localhost:27017/treatmentsDBseneca", {useNewUrlParser:true, useUnifiedTopology: true});

const treatmentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  minduration: Number,
  maxduration: Number
});

const Treatment = mongoose.model("Treatment", treatmentSchema)


module.exports = function( options ) {


//list all treatments

this.add('role:treatment,cmd:list', function( msg, respond ) {
Treatment.find({}, respond)

})


  //find one treatment by id
  this.add( 'role:treatment,cmd:load', function( msg, respond ) {
        // respond(console.log(msg))
Treatment.findOne({id: msg.args.params.id}, respond)

    })


    this.add( 'role:treatment,cmd:id', function( msg, respond ) {
       //(console.log(msg))
Treatment.findOne({id:msg.treatmentId}, respond)

  })


  
  
//create one treatment
    this.add( 'role:treatment,cmd:create', function( msg, respond ) {
        console.log(msg)
const treatment = new Treatment ( {
  id : msg.id,
  name: msg.name,
  price: msg.price,
  minduration: msg.minduration,
  maxduration: msg.maxduration
});

treatment.save(respond);

    })
   }