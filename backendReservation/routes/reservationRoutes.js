import express from 'express';
const router = express.Router();
import {addReservation,getReservationDetail,deleteReservation} from '../controllers/reservationController.js'


router.post('/addReservation',addReservation);
router.get('/getReservation/:userId',getReservationDetail);
router.delete('/deleteReservation/:id',deleteReservation);

export default router; 