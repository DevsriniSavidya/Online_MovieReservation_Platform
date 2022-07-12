import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv  from 'dotenv';
import colors from 'colors'
import  './db/db.js' 
import reservationRoutes from './routes/reservationRoutes.js'



const app = new express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));    
app.use(bodyParser.json());
dotenv.config();

//Reservation Routes
app.use("/reservation",reservationRoutes);



const PORT = process.env.PORT || 9070;

app.listen(PORT, ()=> {

     console.log(`SERVER IS UP AND RUNNING ON ${PORT}`.blue);  

}) 
