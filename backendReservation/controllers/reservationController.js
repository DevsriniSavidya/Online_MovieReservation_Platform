import Reservation from '../models/Reservation.js'
import md5 from 'md5';

export const addReservation = async (req,res) =>{

      

       const userId = req.body.userId;
       const movieName = req.body.moviename;
        const book_ID = md5(`${req.body.userId}${req.body.time}${req.body.date}`);
       const reserveTime = req.body.time;
       const reserveDate =  req.body.date;
       const reserveTheater = req.body.theaterName;
       const numberOfTicket = req.body.seatNo;

         const reserve = new Reservation({userId,movieName,book_ID,reserveTime,reserveDate,reserveTheater,numberOfTicket});
         try{
           await reserve.save()
         res.status(201).json(reserve); 
       }catch  (err){ 
          res.status(500).json(err);
       }
      
}

export const getReservationDetail = async (req,res)=>{

   let userId = req.params.userId;    
   
   Reservation.find({userId:userId}).then((data)=>{
       
      res.json(data);
     
   }).catch((err)=>{

     console.catch.log(err);  
   }) 

}


export const deleteReservation = async (req,res) =>{

  let reserveId = req.params.id;
  await Reservation.findByIdAndDelete(reserveId)
    .then(() => {
      res.status(200).send({ status: "Reservation  deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with Delete Reservation", error: err.message });
    });
}
