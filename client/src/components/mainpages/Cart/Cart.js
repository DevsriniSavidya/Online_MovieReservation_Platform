import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../../GlobalState.js';
import {Button } from '@material-ui/core';
import {Link} from 'react-router-dom' ;
import axios from 'axios';

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.UserAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.ticketPrice * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])



    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

 
    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const setNewMovie = (movies) => {
        let { _id, time, date, quantity} = movies;
    
        localStorage.setItem('ID', _id);
        localStorage.setItem('time', time);
        localStorage.setItem('date', date);
        localStorage.setItem('quantity', quantity);
    
    }

    if(cart.length == 0)
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 
  return (
    <div>
            {
                cart.map(movies => (
                    <div className="detail cart" key={movies._id}>
                        <img src={movies.photo} alt="" />

                        <div className="box-detail">
                            <h2>{movies.name}</h2>
                            <h3>{movies.time}</h3>
                            <h3>{movies.date}</h3>
                            <h3>$ {movies.ticketPrice * movies.quantity}</h3>
                            <p>{movies.description}</p>
                            <p>{movies.filmType}</p>

                            <div className="amount">
                                <button onClick={() => decrement(movies._id)}> - </button>
                                <span>{movies.quantity}</span>
                                <button onClick={() => increment(movies._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(movies._id)}>
                                X
                            </div>
                            <br/>
                            <Button variant="outlined" color="success" size='large' style={{width:"200px"}} onClick={() => setNewMovie(movies)} href={`/checkout/${movies._id}`} >
                            Checkout
                            </Button>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                {/* <PaypalButton */}
                {/* total={total} */}
                {/* tranSuccess={tranSuccess} /> */}
            </div>
        </div>
  )
}

export default Cart