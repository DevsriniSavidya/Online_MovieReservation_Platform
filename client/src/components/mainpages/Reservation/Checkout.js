import React, { useState } from 'react'
import  { useEffect}  from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Button,TextField } from '@material-ui/core';


export default function Checkout() {
  const [movieId,setMovieID] = useState();
  const [theaters,setTheaters] = useState([]);
  const [request,setRequest] = useState([])

  const [theaterName,settheaterName] = useState("");
  //const[theaterMail,setTheaterMail] = useState("");
  const [theaterId,setTheaterId] = useState();
  const [ticketPrice,setTicketPrice] = useState();
  const [movieName,setName] = useState();
  const [disable, setDisable] = React.useState(false);
  const [disableBook,setDisableBook] = React.useState(false);
  
  //booking details
   const [time, setTime] = useState();
   const [date, setDate] = useState();
   const [photo, setPhoto] = useState();
   var [quantity, setQuantity] = useState(0);
   //var [total, setTotal] = useState(0);
   var total= ticketPrice * quantity
   

  useEffect(()=>{
       
      let id =localStorage.getItem('ID');
      setTime(localStorage.getItem('time'));
      setDate(localStorage.getItem('date'));
      setQuantity(localStorage.getItem('quantity'));
      
    
     async function getDetails(){ 
     
    axios.get(`http://localhost:8000/movies/movieDetail/${id}`).then((res)=>{ 

      
      console.log(res.data); 
     
       setName(res.data.name);
       setPhoto(res.data.photo);
     
       setTheaters(res.data.theaters);
      
      setTicketPrice(res.data.ticketPrice);
     

     
    }).catch((err)=>{
        alert(err.message);
    })

      

  }

  getDetails();
  setMovieID(id);
 
   },[]);

    
  const setNewTheater = async (theater) =>{


    settheaterName(theater)
    setDisable(true);
  
    axios.get(`http://localhost:8000/theater/getTheater/${theater}`).then((res)=>{ 
    
     setRequest(res.data)
     


    
   }).catch((err)=>{
       alert(err.message);
   })
  
   }

  

   const bookSeat =  (seatID,Capacity,theaterMail) =>{
    //setTheaterMail(theaterMail);

    setDisableBook(true);
    
    var Capacity = Capacity- quantity;

    const data = {

      Capacity,
      theaterMail,
      theaterName,
      movieName,
      quantity

    }

     axios.put(`http://localhost:8000/theater/update/${seatID}`,data).then(()=>{ 
    
      
         alert("seat book successfully");
        
     
    }).catch((err)=>{
        alert(err.message);
    })
    
    localStorage.setItem('TheaterName',theaterName);
    localStorage.setItem('MovieName',movieName);
    localStorage.setItem('Total',total);

   }


  return (
     <div>
           <Description><b>Select Your Favorite Theater</b> </Description>
              <Controls>{theaters.map((theater,index)=>( <div key={index}> 
               <Button disabled={disable} className='mt-2 ms-2' variant="outlined" onClick={() => setNewTheater(theater)}>{theater}</Button> </div>
             ))}
              
             </Controls>
              <h3><hr/></h3>
            
             <Des ></Des>
               <div class="col-sm-6">
               <div class="card" style={{width:"450px"}}>
                   <div class="card-body">
                   <h4 class="card-title"><b>FILM NAME : {movieName}</b></h4>
                   <h4 class="card-title"><b>NUMBER OF TICKETS : {quantity}</b></h4>
                   <h4 class="card-title"><b>RESERVED THEATER : {theaterName}</b></h4>
                   <h4 class="card-title"><b>TOTAL TICKETS PRICE : {total}</b></h4>
                    <h4 class="card-title"><b>RESERVED TIME : {time}</b></h4>
                  
               </div>
              </div>
              </div>

              <Controls >
             {request.map((seat,index)=>( <div key={index}> 
              
             <Des ><b>AVAILABLE SEATS : {seat.Capacity}</b></Des>
             <Button disabled={disableBook} className='mt-2 ms-2' variant="outlined" onClick={() => bookSeat(seat._id,seat.Capacity,seat.theaterMail)} href={`/addPayment`}>Book Seats</Button>
             </div>
              ))}
             </Controls >
    </div>
  )
}



const Description = styled.div`
 line-height: 1.4;
 font-size: 25px;
 padding: 16px 0px;
 color: #00004d;
  margin-left: 30px;
font-weight: thicker;
 @media (max-width: 768px) {
   font-size: 14px;
 }
`;

const Des = styled.div`
 line-height: 1.4;
 font-size: 20px;
 padding: 16px 0px;
 color: #00004d;
font-weight: thicker;
 @media (max-width: 768px) {
   font-size: 14px;
 }
`;


const Controls = styled.div`
 align-items: center;
 display: flex;
 flex-flow: row nowrap;
 margin: 24px 0px;
 min-height: 56px;
`;