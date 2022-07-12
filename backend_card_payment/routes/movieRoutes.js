import express from 'express';
const router = express.Router();
import {makePayment} from '../controllers/GatewayController.js'
import {saveDetails,getDetails} from '../controllers/paymentcontroller.js'



router.post('/addpayment',makePayment);
router.post('/payment',saveDetails);


export default router;