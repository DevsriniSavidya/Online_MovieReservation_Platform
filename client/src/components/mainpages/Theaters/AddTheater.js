import React,{useState} from "react";
import { useHistory} from 'react-router-dom';
import { OutlinedInput,Container } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from "axios";



export default function AddTheater() {

    const history = useHistory();
    
    const [theaterName, setTheaterName] = useState();
    const [theaterMail, setTheaterMail] = useState();
    const [Capacity, setCapacity] = useState();


         
   async function submitData(e){

      e.preventDefault();
        
        const theaterNew = {

            theaterName,
            theaterMail,
            Capacity
             
            
        }

       await axios.post('http://localhost:8000/theater/addTheater',theaterNew).then(() => {

            alert("Theater is added successfully");
             history.push('/displayMovies');
             
      })
      .catch((err) => {
        alert(err);
      });
    }


  

  return (
         
     <div className="container" align="center">
            <div className="row">
                <div className="col-12">
                    <div className="mb-3 mt-3">
                      <center> <h2>A D D  T H E A T E R</h2></center> 
                    </div>
                </div>
            </div>

     <Form>
      <form  onSubmit={submitData}  >  

                
                    
                    <div className="col-8">
                       
                    
                      <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="text"
                            name="TheaterName"
                            required
                             style={{width:"250px"}}
                            id="TheaterName"
                            placeholder="Theater Name"
                            onChange={(e) => setTheaterName (e.target.value)}
                            
                         />
                    </div>
                     <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="email"
                            name="TheaterMail"
                            required
                            style={{width:"250px"}}
                            id="TheaterMail"
                            placeholder="Theater Mail"
                            onChange={(e) => setTheaterMail (e.target.value)}
                            
                         />
                       <br/> 
                       </div> 
                       <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="text"
                            name="Capacity"
                            required
                            style={{width:"250px"}}
                            id="Capacity"
                            placeholder="Theater Capacity"
                            onChange={(e) => setCapacity (e.target.value)}
                            
                         />
                       <br/> 
                       </div> 
                     </div>
                      
                       <div className="col-xl-12">
                          <button type="submit" className="btn btn-primary mt-5 "  >Add Theater</button>
                    </div>

                    </form>
                </Form>
              </div>      
                            

         
   
  )
}

const Form = styled.div`
   
    width: 50%;
    padding: 50px;
    background:#f2f2f2;
    border-radius: 15px;
    box-shadow: 10px 10px 30px 0;
    text-align: left;
`;

