import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
       
    userId:{
        type:String,
        required:true
    },
    book_ID:{
            type:String,
        required:true
    },

    movieName:{
        type:String,
        required:true,
        trim:true
    },

    reserveTime:{
        type:String,
        required:true
    },

    reserveDate:{
        type:String,
        required:true
    },

    reserveTheater:{
          
      type:String,
      required:true
    },

    numberOfTicket:{
        type:Number,
        required:true
    }


},{timestamps:true})


const Reservation = mongoose.model('Reservation',reservationSchema);
export default Reservation;
