import React from 'react'
import  {useState, useEffect}  from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { OutlinedInput, TextareaAutosize } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import {orange,blue,red } from '@material-ui/core/colors';
// import Stack from '@mui/material/Stack';
import {KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DateFnsUtils from '@date-io/date-fns';
import '../../../CSS/AddM.css'
// import TextareaAutosize from '@mui/material/TextareaAutosize';


export default function UpdateMovie(props) {

     let history = useHistory();
    
    const [movieId,setMovieID] = useState(); 
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [showTime, setShowTime] = useState([]);
    const [theaters,setTheaters] = useState([]);
    const [photo,setPhoto] = useState();
    const [ticketPrice,setTicketPrice] = useState();
    const [filmType,setFilmType] = useState(); 
    const [loading, setLoading] = useState(false);

    //Theaters
    const [requestName,setRequestName] = useState([]) ;
  


    // const theater = [
    //     'Sky Light', 'New Cinema', 'Savoy', 'Cinemax','Liberty Light'
    // ]

  const showTimes = [
        '10.30A.M.', '1.30P.M', '7.30P.M.'
    ]    

  const handleTheaterChange = (event) => { 
        setTheaters(event.target.value);
    };

  const handleTimeChange = (event)=>{
       setShowTime(event.target.value);
  }  


    useEffect(() => {

        const id = localStorage.getItem('ID');

    async function getDetails(){   

     await axios.get(`http://localhost:8000/movies/movieDetail/${id}`).then((res)=>{

      setShowTime(res.data.showTime);  
      setTheaters(res.data.theaters);
   
     
    }).catch((err)=>{
        alert(err.message);
    })

    }

    getDetails(); 
     
        setMovieID(id);
        setName(localStorage.getItem('name'));
        setDescription(localStorage.getItem('description'));
        setTicketPrice(localStorage.getItem('ticketPrice'));
        setFilmType(localStorage.getItem('filmType'));
        setPhoto(localStorage.getItem('photo'));

  


 
    //fetch film halls
    axios.get("http://localhost:8000/theater/all").then((res)=>{

      setRequestName(res.data);  
      
     
    }).catch((err)=>{
        alert(err.message);
    })
 
 

     

    },[props] );

    
     //image upload start
    const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "Chat-app");
    setLoading(true);


    const res = await fetch(
      "https://api.cloudinary.com/v1_1/donfmtaf4/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setPhoto(file.secure_url);
  };
   

  async function submitData(e){

          e.preventDefault();
        
        const data = {
            
            movieId,
            name,
            description,
            showTime,
            theaters,
            photo ,
            ticketPrice,
            filmType 
            
        }

        axios.put(`http://localhost:8280/movie/update/${movieId}`,data).then(() => {

            alert("Movie updated successfully");
            history.push('/displayMovies');
            // e.target.reset(); 
             
      })
      .catch((err) => {
        alert(err);
      });

  }

  
  



  return (
         <div className="container" align="center">
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>UPDATE MOVIE</h2>
                    </div>
                </div>
            </div>

     <Form>
      <form  onSubmit={submitData}  className="add">  

                    <div className="row"> 
                    
                    <div className="col-8">
                        <div className="row">
                    
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="text"
                            name="name"
                            value={name}
                            id="name"
                            placeholder="Movie Name"
                            onChange={(e) => setName (e.target.value)}
                            
                         />
                    </div>
                       <br/>  

                     <div className="row-xl-6 mb-3">
                             
                                <TextareaAutosize
                                   aria-label="minimum height"
                                   minRows={4}
                                   style={{ width: 615 }}
                                   id="description"
                                   value={description}
                                    placeholder="description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    

                                />
                        </div>   
                    <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="text"
                                    name="FilmType"
                                    placeholder="Film Type"
                                    value={filmType}
                                    id="FilmType"
                                    onChange={(e) => setFilmType(e.target.value)}
                                    
                                />
                            </div>    

                    <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="number"
                                    name="price"
                                    placeholder="Ticket Price"
                                    value={ticketPrice}
                                    id="price"
                                    onChange={(e) => setTicketPrice(e.target.value)}
                                   
                                />
                            </div>            

                   <div className="col-xl-6 mb-3">
                                <InputLabel id="demo-mutiple-chip-label">Theaters</InputLabel>
                                    <Select
                                        id="demo-mutiple-chip"
                                        multiple fullWidth
                                        value={theaters}
                                        onChange={handleTheaterChange}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={(selected) => (
                                            <div >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}  />
                                                ))}
                                            </div>
                                        )}
                                    >
                                    {requestName.map((theater) => (
                                        <MenuItem key={theater.theaterName} value={theater.theaterName} >
                                            {theater.theaterName}
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </div>

                         
                          <div className="col-xl-6 mb-3">
                                <InputLabel id="demo-mutiple-chip-label">Available Times</InputLabel>
                                    <Select
                                        id="demo-mutiple-chip"
                                        multiple fullWidth
                                       value={showTime}
                                        onChange={handleTimeChange}
                                        input={<Input id="select-multiple-chip"/>}
                                        renderValue={(selected) => (
                                            <div >
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value}  />
                                                ))}
                                            </div>
                                        )}
                                    >
                                    {showTimes.map((time) => (
                                        <MenuItem key={time} value={time} >
                                            {time}
                                        </MenuItem>
                                    ))}
                                    </Select>
                            </div> 
   

                         
                        <div className="col-4">

                           
                           <div className="form-group">
                                <label htmlFor="moviepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="moviepic"
                                        name="moviepic"
                                        type="file"
                                        onChange={uploadImage}
                                      
                                    />
                                      
                                      <Button  style={{backgroundColor:orange[600]}} variant="contained" component="span">
                                      &nbsp; Upload Banner
                                     </Button>
                                    
                                </label>
                            </div>

        
            <img
              className="img-thumbnail"
              width="150px"
              required
              height="150px"
              src={photo}
              alt="Loading..."
            />        
        </div>

                    </div >
                    </div>
                      </div>
                     <div className="col-xl-12">
                          <button type="submit" className="btn btn-success mt-5 "  >update Movie</button>
                    </div>
                </form> 
                </Form>  
              </div>             
       
  )
}



const Form = styled.div`
   
    width: 70%;
    padding: 50px;
    background:#f2f2f2;
    border-radius: 15px;
    box-shadow: 10px 10px 30px 0;
    text-align: left;
`;
