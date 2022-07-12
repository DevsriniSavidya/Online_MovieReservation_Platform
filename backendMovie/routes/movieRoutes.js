import express from 'express';
const router = express.Router();
import {addMovie,displayMovie,updateMovie,deleteMovie,getMovieDetail} from '../controllers/movieController.js'


router.post('/addMovies',addMovie);
router.get('/',displayMovie);
router.put('/updateMovie/:id',updateMovie);
router.delete('/deleteMovie/:id',deleteMovie);
router.get('/movieDetail/:id',getMovieDetail);
 

export default router; 