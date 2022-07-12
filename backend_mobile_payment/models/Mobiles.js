import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const mobileSchema = new Schema({

    
    mobileNumber: {
        type: String,
        required : true
    },

    pin: {
        type: String,
        required : false
    },

    balance: { 
        type: Number,
         required: false
    }

},{timestamps:true})

const Mobile = mongoose.model("Mobile",mobileSchema);
export default Mobile;