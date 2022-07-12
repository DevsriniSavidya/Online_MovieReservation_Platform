import Theater from '../models/Theater.js'
import nodemailer from 'nodemailer';

export const addTheater = async (req,res) =>{

       try{
         const theater = await Theater.create(req.body);
       
         res.status(201).json(theater); 
       }catch  (err){ 
          res.status(500).json(err);
       }
      
}

export const getTheater = async (req,res)=>{

  

   Theater.find({theaterName:req.params.name}).then((data)=>{
       
      res.json(data);
     
   }).catch((err)=>{

     console.catch.log(err);  
   }) 

}

export const getAllTheater = async (req,res) => {

  Theater.find().then((data)=>{
     res.json(data);
     
  }).catch((err)=>{

     console.catch.log(err);
  })

}


export const updateTheater = async (req,res) =>{
  
    const theaterID = req.params.id;

     const {Capacity,theaterMail,theaterName,movieName,quantity}= req.body;
    
    const updateTheater = {Capacity} ;

    const update = await Theater.findByIdAndUpdate(theaterID, updateTheater)
      .then(() => {
      res.status(200).send({ status: "Capacity is  Updated " });
    })
    .then(update=>{

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

 to: `${theaterMail}`,

 subject: 'The MovieHub',




text: ` Booking  notification`,


 html: `<br> </br>Theater name:${theaterName}<br>  movie name:${movieName} </br> <br>   </br><br>  seatNo:${quantity} </br><br> available seats:${Capacity}  <br />`,



};




transporter.sendMail(mailOptions, (err, data) => {

 if (err) {

     console.log('Error occurs',err);

  }

     console.log('Email sent!!!');

 });

      

}    

)

    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with Updating capacity", error: err.message });
    });
}
