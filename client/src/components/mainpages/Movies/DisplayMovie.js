import styled from "styled-components";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from 'axios';
import React from 'react'
import {useState,useEffect} from 'react'
// import CardActions from '@mui/material/CardActions';  
// import Button from '@mui/material/Button';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
// import Stack from '@mui/material/Stack';

//new
import { Button, CardActions } from "@material-ui/core";

const DisplayMovie = (props) => {
  
    const [request, setRequest] = useState([]);
    
  
  
   useEffect(()=>{
       
    axios.get("http://localhost:8280/movie/get").then((res)=>{

      setRequest(res.data);  
      console.log(res.data);  
     
    }).catch((err)=>{
        alert(err.message);
    })
 
   },[]);

   const setData = (data) =>{

     let {_id,name,description,showTime,theaters,ticketPrice,filmType,photo} = data;

    localStorage.setItem("ID", _id);
    localStorage.setItem("name", name);
    localStorage.setItem("description", description);
    localStorage.setItem("showTime", JSON.stringify(showTime));
    localStorage.setItem("theaters", JSON.stringify(theaters));
    localStorage.setItem("ticketPrice", ticketPrice);
    localStorage.setItem("filmType", filmType);
    localStorage.setItem("photo", photo);

   };
  


   function DeleteMovie(id){

         
        let ans = window.confirm("Do you really want to delete this Movie ?");

        if(ans){

      
        axios.delete(`http://localhost:8280/movie/delete/${id}`).then(()=>{

              alert("Movie Delete successfully");
            //  <Alert severity="success">
            //     <AlertTitle>Success</AlertTitle>
            //       <strong>Movie Is Successfully Deleted</strong>
            //   </Alert>
            
            window.location.reload(false);
          
            
         }).catch((err)=>{
    
            alert(err);
         })
    

    }

   }


  return (

    <Container>
     <center> <h4>MOVIES</h4></center>
      <Content>
        { request.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={`/movieDetails/`}  onClick={()=>setData(movie)} >
                <img src={movie.photo} alt={movie.name}  />
                
              
              </Link>
            
             <Name>{movie.name}</Name>
             <CardActions>
               <Button size="small" href="/updateMovie"   onClick={() => setData(movie)}>Update</Button>
               <a  type="button"  size="small" onClick={()=>DeleteMovie(movie._id)}>Delete </a>
              </CardActions>
            </Wrap>
             
          ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

  img {
    inset: 0px;
    display: block;
    height: 70%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

const Name = styled.div`
   margin-top: 35px;
  line-height: 1.4;
  font-size: 20px;
  padding: 0px 0px;
  color: #00004d;
font-weight: thicker;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export default DisplayMovie;
