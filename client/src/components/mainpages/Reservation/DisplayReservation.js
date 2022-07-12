import React, { useState,useContext } from 'react'
import  { useEffect}  from 'react';
import axios from 'axios';
import styled from "styled-components";
import { Button,TextField,CardActions} from '@material-ui/core';
import {GlobalState} from '../../../GlobalState.js';
import UserAPI from '../../../api/UserAPI.js';


export default function DisplayReservation() {

  const state = useContext(GlobalState)
  const [crrUser,setCrrUser] = state.UserAPI.crrUser;
  const [request,setRequest] = useState([])
  const [id,setId] = useState()

  useEffect(()=>{

     setId(crrUser._id);
       
     async function getDetails(){ 
     
    axios.get(`http://localhost:8280/reservation/getReservation/${crrUser._id}`).then((res)=>{ 

      
      console.log(res.data); 

      
      setRequest(res.data)
       
     

     
    }).catch((err)=>{
        alert(err.message);
    })

      

  }

  getDetails();

 
   },[]);


console.log(id)
    


   function deletemovie(id){

         
    let ans = window.confirm("Do you really want to delete this reservation ?");

    if(ans){

  
    axios.delete(`http://localhost:8280/reservation/deleteReservation/${id}`).then(()=>{

          alert("Movie Delete successfully");
            window.location.reload(false);

        
        
       
      
        
     }).catch((err)=>{

        alert(err);
     })


}

}


  return (
     
           <Container>
                    <center> <h4>BOOK MOVIES</h4></center>
              <Content>
              {/* <h3><hr/></h3> */}
            
             {/* <Des ></Des> */}

               
                 
               {/* <div class="card" style={{width:"450px"}}> */}
               {request.map((book,index)=>( <div key={index}>
                   {/* <CardActions> */}
                   
                   {/* <div class="card-body"> */}
                   <Wrap key={index} >
                   <h4 class="card-title"><b>FILM NAME : </b>{book.movieName}</h4>
                   <h4 class="card-title"><b>NUMBER OF TICKETS :</b> {book.numberOfTicket}</h4>
                   <h4 class="card-title"><b>RESERVED THEATER :</b> {book.reserveTheater}</h4>
                   <h4 class="card-title"><b>RESERVED DATE : </b>{book.reserveDate}</h4>
                    <h4 class="card-title"><b>RESERVED TIME : </b>{book.reserveTime}</h4>
                    <Button onClick={()=>deletemovie(book._id)}>delete</Button>
                    </Wrap>
               {/* </div> */}
               {/* </CardActions> */}
                      </div>
                            ))}
              {/* </div> */}
              
               
              </Content>
                </Container>
     
  )
}

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 50px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);


  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
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