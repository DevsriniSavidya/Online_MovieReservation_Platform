

import Mobile from '../models/Mobiles.js';
import  {sendmassage}  from '../validations/SmsService.js';
import {
  validateMobilePaymentRequest,
  validateMobileNumber
} from '../validations/MoGatewayValidation.js';

export const mobilemakePayment = async (req, res) => {
  try {
    // validate request body
    const validatedDetails = validateMobilePaymentRequest(req, res);
      // get card details
      const mobile = await Mobile.findOne({mobileNumber: req.body.mobileNumber});
      // match mobile details
      var err_message = "";
      if (!mobile) err_message = "invalid mobile number";
      else if (mobile.pin != req.body.pin)
        err_message = "pin number did not match";
      // iff data is not matched
      if (err_message.length > 0)
        return res.status(400).json({ message: err_message });

      // if data is matched
      // complete transaction
      
      mobile.balance += parseInt(req.body.transfer_amount);
      
      var result = await mobile.save();

      // save failed
      if (result && result.error) return res.status(400).json(result.error);
     
      return res.status(200).json({
        payment: "Payment was successfull",
        status: 1,
      });
   
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "This mobile number does not accept payments" });
  }
};


export const requestPin = async (req, res) => {
    try {
      var phone_number = req.params.number;
      console.log(phone_number);
  
      // validate mobile number
      var error = validateMobileNumber(phone_number);
      if (error.length > 0) return res.status(400).json({ mesaage: error });
  
      // send pin number
      // generate random 4 digit pin
      var pin = Math.floor(1000 + Math.random() * 9000);
      console.log(pin);
  
      var mobile = await Mobile.findOne({ mobileNumber: phone_number });
      if (!mobile) {
        mobile = new Mobile({
          mobile_no: phone_number,
          pin,
        });
      } else mobile.pin = pin;
  
      var result = await mobile.save();
  
      // save failed
      if (result && result.error)
        return res
          .status(400)
          .json({ message: "Unexpected error please try again" });
  
      // send the pin via sms
      var smsOptions = {
        to: phone_number,
        body: `Your Movihub Payment Pin is - ${pin}`,
      };
  
      await sendmassage(smsOptions);
  
      return res.status(200).json({
        message: "Pin was sent successfull",
      });
      

    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errors: { message: "Invalid mobile number" } });
    }
  };

