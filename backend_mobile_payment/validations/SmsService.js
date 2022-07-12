

import Vonage from '@vonage/server-sdk'

const vonage = new Vonage({
  apiKey: "a54f4b45",
  apiSecret: "WXvZbucg6PCeoyPM"
})
  
  
  export const sendmassage = async (smsOptions) => {
    try {
      const from = "Vonage APIs"
      const to = `${smsOptions.to}`
      const text = `${smsOptions.body}`
      
     await vonage.message.sendSms(from, to, text, (err, responseData) => {
          if (err) {
              console.log(err);
          } else {
              if(responseData.messages[0]['status'] === "0") {
                  console.log("Message sent successfully.");
              } else {
                  console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
              }
          }
      })
    } catch (error) {
      console.log(error);
    }
  };