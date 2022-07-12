import express from 'express';
const router = express.Router();
import {addTheater,getTheater,getAllTheater,updateTheater} from '../controllers/theaterController.js'


router.post('/addTheater',addTheater);
router.get('/getTheater/:name',getTheater);
router.get('/all',getAllTheater);
router.put('/update/:id/',updateTheater);

export default router;