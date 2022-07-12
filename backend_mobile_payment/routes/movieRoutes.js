import express from 'express';
const router = express.Router();
import {mobilemakePayment,requestPin} from '../controllers/MoGatewayController.js'
import {saveDetails,getDetails} from '../controllers/paymentcontroller.js'



router.post('/addmopayment',mobilemakePayment);
router.post('/addmopayment/:number',requestPin);
router.post('/payment',saveDetails);


export default router;