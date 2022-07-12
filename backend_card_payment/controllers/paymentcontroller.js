import Payment from '../models/paymentmodel.js';
import md5 from 'md5';
import nodemailer from 'nodemailer';


export const saveDetails  = async (req,res)=>{
    const PaymentType = req.body.PaymentType;
    const Username = req.body.Username;
    const book_ID = md5(`${req.body.userId}${req.body.time}${req.body.date}`);
    const nameOnCard =req.body.nameOnCard;
    const email =req.body.email;
    const amount = req.body.transfer_amount;
    const moviename = req.body.moviename;
    const seatNo = req.body.seatNo;
    const cardNo = md5(`${req.body.cardNumber}`);

    const Paymentdetails = new Payment ({PaymentType,Username,book_ID,nameOnCard,email,amount,cardNo})

    try {
        await Paymentdetails.save()

        .then(Paymentdetails=>{

             res.status(200).json("Payment done");




                       

    let transporter = nodemailer.createTransport({

        service: 'gmail',

        auth: {

              user: 'themoviehub3020@gmail.com' ,

              pass: 'moviehub3020'

         }

        

    });




    let mailOptions = {

        from: 'themoviehub3020@gmail.com',             //need to add new email

        to: `${email}`,

        subject: 'MovieHub',

        


   text: 'Payment Successful!!!',

        attachments: [{
            filename: '-qr-code.png',
            path: './qrcode/-qr-code.png',
            cid: 'unique'
        }],
       

        html: `<br>  username:${Username} </br><br>  movie name:${moviename} </br> <br>  pay amount:${amount} </br><br>  seatNo:${seatNo} </br><br> Your payment is successful!!  <img src="cid:unique.ee"/> <br />`,

       

    };




    transporter.sendMail(mailOptions, (err, data) => {

        if (err) {

            console.log('Error occurs',err);

         }

            console.log('Email sent!!!');

        });

             

    }    

      )
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const getDetails = async (req,res)=>{
    try {
        const paydetails = await Payment.find();
        res.json(paydetails);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 




