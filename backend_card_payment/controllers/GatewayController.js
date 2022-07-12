import md5 from 'md5';


import Card from '../models/Cards.js';
import {
  validatePaymentRequest,
  matchCardDetails
} from '../validations/GatewayValidations.js';

export const makePayment = async (req, res) => {
   
  try {
    // validate request body
    const validatedDetails = validatePaymentRequest(req, res);
    // hash body card number
    var hash_card_number = md5(
      `${req.body.cardNumber}`
    );
    console.log(hash_card_number);
    
      // get card details
      const card = await Card.findOne({cardNumber: hash_card_number});
       
        console.log(card)
      // match credit card details
      const transferInfo = matchCardDetails(card, validatedDetails, res);
      
      // complete transaction
      card.balance -= transferInfo.transfer_amount;
      var result = await card.save();

      // save failed
      if (result && result.error) return res.status(400).json(result.error);
      //payment complted therefour notify main server payment complted
     
      return res.status(200).json({
        payment: "Payment was successfull",
        status: 1,
      });
   
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid card number" });
  }
};
