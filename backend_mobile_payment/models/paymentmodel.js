import mongoose from "mongoose";

const Payment = mongoose.Schema({
    PaymentType:{
        type:String,
        require:true
    },
    
    Username:{
        type:String,
        require:true
    },
    
    cardNo:{
        type:String,
        require:false
    },
    
    MobileNumber:{
        type:String,
        require:false
    },
    
    book_ID:{
        type:String,
        require:true
    },
    
    email:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },

},{timestamps:true})

export default mongoose.model('payment',Payment)