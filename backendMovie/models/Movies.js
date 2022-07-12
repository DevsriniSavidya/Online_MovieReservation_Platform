import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
     showTime:{
        type:[String],
        required:true,
  
    },
    theaters:{
        type:[String],
        required:true 
    },
    photo:{
        type:String,
        
    },
    ticketPrice:{
        type:Number,
        required:true,
     
    },
     filmType:{
        type:String,
        required:true,
        trim:true
    },
    banner:{
        type:String,
    }

   
},{timestamps:true})


const Movie = mongoose.model('Movie',movieSchema);
export default Movie;

