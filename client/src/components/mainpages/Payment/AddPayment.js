import React, {useContext, useState } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import swal from "sweetalert";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {GlobalState} from '../../../GlobalState.js';
import styled from "styled-components";
import UserAPI from '../../../api/UserAPI.js';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
  } from "@material-ui/core";
//import { saveDetails } from "../../../Backend/controllers/paymentcontroller.js";
//import { Promise } from "mongoose";
//import { Promise } from "mongoose";
//import { useNavigate } from "react-router-dom";


const AddPayment = () =>{
    const state = useContext(GlobalState)
    const [crrUser,setCrrUser] = state.UserAPI.crrUser;
    const [cardType, setcardType] = useState("Master Card");
    const [cardHolderName, setcardHolderName] = useState("");
    const [cardNumber, setcardNumber] = useState("");
    const [expirationDate, setexpirationDate] = useState("");
    const [cardSecurityCode, setcardSecurityCode] = useState("");
    const [mobileNumber, setmobileNumber] = useState();
    const [pin, setpin] = useState("");
    const [status,setStatus]=useState("");
    const [cart, setCart] = state.UserAPI.cart
    const [token] = state.token
    // const [email, setEmail] = useState("");
  //  const navigate = useNavigate();
    const order_id="3";
    
    const Username = crrUser.name;
    const userId = crrUser._id;
    const email= crrUser.email;
    //const moviename="batman"
    //const seatNo= quantity;
    const [PaymentType,setPaymentType]=useState("card");

    //booking details
   //const [time, setTime] = useState();
   //const [date, setDate] = useState();
   //var [seatNo, setQuantity] = useState(0);
//    const [moviename,setMoviename]=useState();
//    const [theaterName,settheaterName]=useState();

      const id =localStorage.getItem('ID');
     const time = localStorage.getItem('time');
     const date =localStorage.getItem('date');
     const seatNo =  localStorage.getItem('quantity');
    const moviename= localStorage.getItem('MovieName');
    const theaterName = localStorage.getItem('TheaterName');
    const transfer_amount= localStorage.getItem('Total');
    
    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const cardPayment =async(e) => {
        e.preventDefault();

        const data ={

            cardHolderName,
            cardNumber,
            expirationDate,
            order_id,
            transfer_amount,
            cardSecurityCode,
            // email
        }
        try {
            await axios.post('http://localhost:8280/cardPay/addpayment',data);
               // navigate("/ViewDetails")
               swal("successfully add card payment")
               setStatus("1")
               
               cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)

               const dataAdd ={
                PaymentType,
                Username,
                cardNumber,
                order_id,
                email,
                transfer_amount,
                moviename,
                seatNo

            }
            try {
              axios.post('http://localhost:8280/cardPay/payment',dataAdd);
                   // navigate("/ViewDetails")
                   swal("successfully save card payment")


                    const reserDataAdd ={
                
                    
                    userId,
                    theaterName,
                    date,
                    time,
                    moviename,
                    seatNo
                }
                try {
                  axios.post('http://localhost:8280/reservation/addReservation',reserDataAdd);
                       // navigate("/ViewDetails")
                       swal("successfully add reservation")
    
    
                       
                    
                } catch (error) {
                  
                    console.log(error);
                    swal("reservaion save faild")
                }
                
            } catch (error) {
              
                console.log(error);
                swal("card payment save failed")
            }
               
            
        } catch (error) {
            swal("card payment failed")
            console.log(error);
            setStatus("0")
        }
    }


    const mobilePayment =async(e) => {
        e.preventDefault();

        const data ={

            order_id,
            transfer_amount,
            mobileNumber,
            pin,
            transfer_amount
            // email
        }
        try {
            await axios.post(`http://localhost:8280/mobilePay/addmopayment`,data);
               // navigate("/ViewDetails")
               swal("successfully add mobile payment")
              // {()=>saveDetails()}
              //setStatus("1")

              cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)

              const dataAdd ={
                PaymentType,
                Username,
                mobileNumber,
                order_id,
                email,
                transfer_amount,
                moviename,
                seatNo
            }
            try {
              axios.post('http://localhost:8280/mobilePay/payment',dataAdd);
                   // navigate("/ViewDetails")
                   swal("successfully save mobile payment")


                   const reserDataAdd ={
                
                    
                    userId,
                    theaterName,
                    date,
                    time,
                    moviename,
                    seatNo
                }
                try {
                  axios.post('http://localhost:8280/reservation/addReservation',reserDataAdd);
                       // navigate("/ViewDetails")
                       swal("successfully add reservation")
    
    
                       
                    
                } catch (error) {
                  
                    console.log(error);
                    swal("reservaion save faild")
                }



                
            } catch (error) {
              
                console.log(error);
                swal("mobile payment save faild")
            }
        
        } catch (error) {
            swal("mobile payment add faild")
            console.log(error);
            setStatus("0")
        }
    }

    

    const requestPin =async(e) => {
        e.preventDefault();

        console.log(mobileNumber)

        const data ={

           
            mobileNumber
           
            // email
        }
        try {
            await axios.post(`http://localhost:8070/mobilePay/addmopayment/${mobileNumber}`);
               // navigate("/ViewDetails")
               swal("sucsessfuly send pin")
            
        } catch (error) {
            swal("pin send fail")
            console.log(error);
        }
    }

    //  function OnSubmit(PaymentType) {
    //         if(PaymentType=="card"){
    //             cardPayment()
    //         }else if(PaymentType=="mobile"){
    //             mobilePayment()
    //         }

    // }

    // const handleMobileNumberChange = (event) => { 
    //     setmobileNumber(event.target.value);
    // };

        console.log(email)

    return(
        <div>
 <React.Fragment> 
         
   <form >
   <div class="container mt-4 d-flex justify-content-center main">
        <div class="card" style={{width:"500px",height:"550px"}} >
          <Form>     
        <form onSubmit={cardPayment}>
            <div class="d-flex justify-content-between px-3 pt-4">
            <Box mb={2}>
            <Typography variant="h6" gutterBottom>
              <b> ENTER PAYMENT DETAILS</b>
             </Typography>
             </Box>
                <div class="amount">
                    <div class="inner">
                        <span class="dollar">TOTAL</span>
                        {/* //need to change with session */}
                        <span class="total">Rs.{transfer_amount}</span>  
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between px-3 pt-4">
            <div>
                     {/* <label for="iText" class="exptxt">Payment Type</label> */}
                     {/* <input type="text" class="form-control" value={cardType} onChange={e=> setcardType(e.target.value)} required/> */}
                     <Grid item xs={12}>
                     <Select 
                       labelId="demo-simple-select-helper-label"
                       label="Payment Type"
                       id="payment_type"
                      name="payment_type"
                       //class="form-control" 
                       value={PaymentType} 
                       onChange={e=> setPaymentType(e.target.value)} required>
                         <MenuItem value = "card" selected="selected">Card Payment</MenuItem>
                         <MenuItem value = "mobile">Mobile Payment</MenuItem>
                     </Select>
                     </Grid>
                 </div>
            </div>
            <div class="d-flex justify-content-between px-3 pt-4">
        
            {PaymentType === "card" ? (
                    
                 <div>
                     
                     {/* <input type="text" class="form-control" value={cardType} onChange={e=> setcardType(e.target.value)} required/> */}
                     <Grid item xs={12}>
                     <Select 
                     labelId="demo-simple-select-helper-label"
                     label="Card Type"
                     id="card_type"
                      value={cardType} 
                      onChange={e=> setcardType(e.target.value)} required>
                         <MenuItem value = "Master Card">Master Card</MenuItem>
                         <MenuItem value = "VISA Card">VISA Card</MenuItem>
                     </Select>
                     </Grid>
                 </div>
                 ):(<label></label>)} {PaymentType === "card" ? (
                        
                 <div>
                    {/* <label for="iText" class="iTxt">Name on Card</label> */}
                    <Grid item xs={12} md={12}>
                    <TextField label="Name on Card" type="text" fullWidth value={cardHolderName} onChange={e=> setcardHolderName(e.target.value)} required />
                    </Grid>
                </div>
                ):(<label></label>)}
            </div>
            {PaymentType === "card" ? (
            <div class="px-3 pt-3">
                {/* <label for="card number" class="iTxt">CARD NUMBER</label> */}
                <Grid item xs={12} md={12}>
                <TextField label="Card Number" type="number" fullWidth  placeholder="8881 2545 2545 2245"value={cardNumber} onChange={e=> setcardNumber(e.target.value)} required/>
                </Grid>
            </div>
           ):(<label></label>)} {PaymentType === "card" ? (
           
            <div class="d-flex justify-content-between px-3 pt-4">
                 <div>
                     {/* <label for="date" class="exptxt">Expiration Date</label> */}
                     {/* <input type="date"  class="form-control " placeholder="MM / YY"/> */}
                     <Grid item xs={12} md={12}>
                     <TextField type="text" label="Expiration Date" fullWidth value={expirationDate} onChange={e=> setexpirationDate(e.target.value)} required/>
                     </Grid>
                 </div>
                 
                 <div>
                    {/* <label for="iText" class="iTxt">CVV /CVC</label> */}
                    <Grid item xs={12} md={12}>
                    <TextField type="number" fullWidth label="CVV /CVC" placeholder="123" value={cardSecurityCode} onChange={e=> setcardSecurityCode(e.target.value)} required/>
                    </Grid>
                </div>
            </div>
                ):(<label></label>)} {PaymentType === "card" ? (
                <div class="d-flex align-items-center justify-content-between px-3 py-4"> 
                
                <div>
                    <Button variant="contained"
                     size="small"
                      type="submit"
                     class=" cardpayment"
                     style={{marginLeft: '330px'}}
                    // onClick={cardPayment}
                     color={
                             "primary"
                         }
                     >Make Payment</Button>
                    
                </div>
            </div>
               
               ):(<label></label>)}

        </form>
        

        <form onSubmit={mobilePayment}>
        {/* mobile payment */}
            {PaymentType === "mobile" ? (
            <div class="d-flex justify-content-between px-3 pt-4">
                {/* <label for="card number" class="iTxt">PHONE NUMBER</label> */}
                <Grid item xs={12} md={12}>
                <PhoneInput style={{width:"200px"}} placeholder="771234567"value={mobileNumber} onChange={setmobileNumber} required/>
                </Grid>
            
            <Button 
            type="requestpin"
            variant="contained"
             size="small" 
             style={{width:"170px",height:"30px"}}
             color={"secondary"}
            onClick={requestPin}  class=" pin">REQUEST PIN</Button>
            </div>
           ):(<label></label>)} {PaymentType === "mobile" ? (
           
            <div class="d-flex justify-content-between px-3 pt-4">
                  
                 <div>
                    {/* <label for="iText" class="iTxt">PIN</label> */}
                    <Grid item xs={12} md={12}>
                    <TextField type="number" label="PIN" fullWidth placeholder="1234" value={pin} onChange={e=> setpin(e.target.value)} required/>
                    </Grid>
                </div>
            </div>

            ):(<label></label>)} {PaymentType === "mobile" ? (

               <div class="d-flex align-items-center justify-content-between px-3 py-4"> 
                
                <div>
                    <button type="submit" 
                     variant="contained"
                     //onClick={mobilePayment}
                     style={{marginLeft: '330px'}}
                     size="small" 
                    color={"primary"}
                      class=" payment">Make Payment</button>
                    
                </div>
            </div>
               
            ):(<label></label>)}

        </form>   
         </Form>     
           
            
        </div>
    </div>
    </form>
</React.Fragment> 
        </div>
 )
 }

 const Form = styled.div`
   
    width: 100%;
    padding: 50px;
    background:#f2f2f2;
    border-radius: 15px;
    box-shadow: 10px 10px 30px 0;
    text-align: left;
`;



export default AddPayment;


{/* <label for="card number" class="d-flex justify-content-between">
<span class="labeltxt">CARD NUMBER</span>
<img src="images/mastercard-logo.png" width="25" class="image">
</label> */}