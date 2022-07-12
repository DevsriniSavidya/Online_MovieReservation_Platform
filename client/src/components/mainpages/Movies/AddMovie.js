import React,{useState,useEffect} from "react";
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

//text area
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";


const theme = createMuiTheme({
    props: {
        MuiTextField: {
            variant: "outlined"
        }
    }
});


export default function AddMovie() {

 const history = useHistory();
    
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [showTime, setShowTime] = useState([]);
    const [theaters,setTheaters] = useState([]);
     const [photo,setPhoto] = useState();
    const [ticketPrice,setTicketPrice] = useState();
    const [filmType,setFilmType] = useState();
    const [banner, setBanner] = useState();  
    // const [previewSource, setPreviewSource] = useState();
    const [loading, setLoading] = useState(false);

    //Theaters
    const [requestName,setRequestName] = useState([]) ;


    useEffect(()=>{
       
    axios.get("http://localhost:8280/theater/all").then((res)=>{

      setRequestName(res.data);  
      
     
    }).catch((err)=>{
        alert(err.message);
    })
 
   },[]);

    

    


    
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


   //Banner upload start
   const uploadBanner = async (e) => {
    const filesN = e.target.files;
    const dataN = new FormData();
    dataN.append("file", filesN[0]);
    dataN.append("upload_preset", "Chat-app");
    setLoading(true);


    const res = await fetch(
      "https://api.cloudinary.com/v1_1/donfmtaf4/image/upload",
      {
        method: "POST",
        body: dataN,
      }
    );
    const fileN = await res.json();
    setBanner(fileN.secure_url);
  };

      
   async function submitData(e){

      e.preventDefault();
        
        const dataNew = {

            name,
            description,
            showTime,
            theaters,
            ticketPrice,
            filmType,
            photo,
            banner
             
            
        }

       await axios.post('http://localhost:8280/movie/addMovies',dataNew).then(() => {

            alert("Movie is added successfully");
             history.push('/displayMovies');
             
      })
      .catch((err) => {
        alert(err);
      });
    }





  // const theater = [
  //       'Sky Light', 'New Cinema', 'Savoy', 'Cinemax','Liberty Light'
  //   ]

  const showTimes = [
        '10.30A.M.', '1.30P.M', '7.30P.M.'
    ]    

  const handleTheaterChange = (event) => { 
        setTheaters(event.target.value);
    };

  const handleTimeChange = (event)=>{
     setShowTime(event.target.value);
  }  



  return (

  
       
     <div className="container" align="center">


            <div className="row">
                <div className="col-12">
                    <div className="mb-3 mt-3">
                      <center> <h2>A D D  M O V I E</h2></center> 
                    </div>
                </div>
            </div>

     <Form>
      <form  onSubmit={submitData}  >  

                    <div className="row"> 
                    
                    <div className="col-8">
                        <div className="row">
                    
                            <div className="col-xl-6 mb-3">
                        <OutlinedInput
                            type="text"
                            name="name"
                            required
                            id="name"
                            placeholder="Movie Name"
                            onChange={(e) => setName (e.target.value)}
                            
                         />
                    </div>
                       <br/>  

                     <div className="row-xl-6 mb-3 ml-auto">
                            

              <MuiThemeProvider theme={theme}>
                <Grid container direction="row" spacing={1}>
               
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        multiline
                        label="Description"
                        required
                        InputProps={{
                            inputComponent: TextareaAutosize,
                            rows: 3
                        }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
              
                    />
                </Grid>
               </Grid>
              </MuiThemeProvider>
                        </div>   
                    <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="text"
                                    name="FilmType"
                                    required
                                    placeholder="Film Type"
                                    id="FilmType"
                                    onChange={(e) => setFilmType(e.target.value)}
                                    
                                />
                            </div>    

                    <div className="col-xl-6 mb-3">
                                <OutlinedInput
                                    type="number"
                                    name="price"
                                    required
                                    placeholder="Ticket Price"
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
                                        required
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

                           
                           <div className="form-group ms-1">
                                <label htmlFor="moviepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="moviepic"
                                        name="moviepic"
                                        type="file"
                                        onChange={uploadImage}
                                      
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp;Photo
                                    </Button>
                                </label>
                            </div>

          {loading ? (
            <img
              className="img-thumbnail"
              width="150px"
              required
              height="150px"
              src={photo}
              alt="Loading..."
            />
          ) : (
            <label htmlFor="loading" className="form-label" />
          )}

        
        </div>
               <div className="col-5">

                           
                           <div className="form-group ms-2">
                                <label htmlFor="banner">
                                    <input
                                        style={{ display: 'none' }}
                                        id="banner"
                                        name="banner"
                                        type="file"
                                        onChange={uploadBanner}
                                      
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload Banner
                                    </Button>
                                </label>
                            </div>

          {loading ? (
            <img
              className="img-thumbnail"
              width="150px"
              required
              height="150px"
              src={banner}
              alt="Loading..."
            />
          ) : (
            <label htmlFor="loading" className="form-label" />
          )}

        
        </div>
               

                        </div >
                    </div>
                      </div>
                     <div className="col-xl-12">
                          <button type="submit" className="btn btn-primary mt-5 "  >Add Movie</button>
                    </div>
                </form>  
                 </Form> 
              </div>             
      
  )
}

const Form = styled.div`
   
    width: 80%;
    padding: 50px;
    background:#f2f2f2;
    border-radius: 15px;
    box-shadow: 10px 10px 30px 0;
    text-align: left;
`;

