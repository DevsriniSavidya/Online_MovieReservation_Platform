
import express from 'express';
import Card from '../models/Cards.js';
import md5 from 'md5';

const router = express.Router();


router.route("/add").post((req,res)=>{
    
    const cardName = req.body.cardName;
    const cardNumber = md5(`${req.body.cardNumber}`);
    const cardType = req.body.cardType;
    const cardHolderName = req.body.cardHolderName;
    const balance = req.body.balance;
    const cardSecurityCode = md5(`${req.body.cardSecurityCode}`);

    const newCard = new Card({cardName,cardNumber,cardType,cardHolderName,cardSecurityCode,balance})

         try{

             newCard.save()
            return res.status(200).json("Card Added");

         }catch (err){
            
            return res.status(500).json(err);

         }
    

})



router.route("/").get((req,res)=>{
    Card.find().then((cards)=>{
        res.json(cards)
        existingReqRouter: Card
    }).catch((err)=>{
        console.log(err)
    })
})


  
  router.get("/getMyCard/:id",(req,res)=>{
    let crdid = req.params.id;
    Card.find({_id:crdid}).exec((err,Card)=>{
          if(err){
              return res.status(400).json({
                 error:err
             });
         }
            return res.status(200).json({
              success:true,
              existingPayRouter:Card,

          });
      });
  })
  


    

router.route("/delete/:id").delete(async (req,res)=>{
    let cardid = req.params.id;
 
    await Card.findByIdAndDelete(cardid)
    .then(()=>{
        res.status(200).send({status: "Deleted!"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error delete"})
    })
})




   


export default router;