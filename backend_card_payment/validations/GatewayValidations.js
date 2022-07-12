// validate payment request boduy
import md5 from 'md5';
export const validatePaymentRequest = (req, res) => {
    var message = "";
    var details = req.body;
  
    if (!details && !details.order_id) message = "Invalid payment details";
    else if (!details.cardNumber) message = "Enter card number";
    else if (isNaN(details.cardNumber)) message = "Invalid card number";
    else if (!details.cardSecurityCode) message = "Enter card CVC";
    else if (isNaN(details.cardSecurityCode)) message = "Invalid card CVC"; 
    else if (!details.cardHolderName) message = "Enter card holder name";
    else if (!details.transfer_amount) message = "Enter transfer amount";
    else if (isNaN(details.transfer_amount)) message = "Invalid transfer amount";
  
    if (message.length > 0) return res.status(422).json({ message });
    else return details;
  };

  
  
  // validate credit card deatils with provided details
  export const matchCardDetails = (card, req_details, res) => {
  
    var err_message = "";
    if (!card)
      err_message =
        "There is no credit card associated with the card no provided";
   
    

    else if (card.cardNumber != md5(`${req_details.cardNumber}`))
      err_message = "Card number did not match";
    else if (card.cardHolderName != req_details.cardHolderName)
      err_message = "Card holder name did not match";
    else if (card.cardSecurityCode != md5(`${req_details.cardSecurityCode}`))
      err_message = "Card CVC number did not match";
    else if (card.balance < req_details.transfer_amount)
      err_message = "Card balance is not suffient";
  
    if (err_message.length > 0)
      return res.status(422).json({ message: err_message });
    else return req_details;
  };

  