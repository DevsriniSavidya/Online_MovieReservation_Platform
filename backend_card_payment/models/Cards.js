import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cardSchema = new Schema({


    // uid: {
    //     type: String,
    //     required : true
    // },

    cardName: {
        type: String,
        required : true
    },
    
    cardNumber: {
        type: String,
        required : true
    },

    cardType: {
        type: String,
        required : true
    },

    cardHolderName: {
        type: String,
        required : true
    },

    cardSecurityCode: {
        type: String,
        required : true
    },

    balance: { 
        type: Number,
         required: true
    }

},{timestamps:true})

const Card = mongoose.model("Card",cardSchema);
export default Card;