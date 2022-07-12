import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const theaterSchema = new Schema({

    theaterName:{
        type:String,
        required:true,
        trim:true
    },
    theaterMail:{
        type:String,
        required:true,
        trim:true
    },
     Capacity:{
         type:Number,
         required:true
    }
   
},{timestamps:true})


const Theater = mongoose.model('Theater',theaterSchema);
export default Theater;

