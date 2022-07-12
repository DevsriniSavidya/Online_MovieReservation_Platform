import React, { useContext } from 'react';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import Auth from './Auth/Auth.js';
import Cart from './Cart/Cart.js';
import NotFound from './utils/NotFound.js'
import DisplayMovie from './Movies/DisplayMovie'
import AddMovie from './Movies/AddMovie.js'
import MovieDetails from './Movies/MovieDetails.js'
import UpdateMovie from './Movies/UpdateMovie.js'
import HomeDisplayMovies from './Movies/HomeDisplayMovies.js'
import Home from './Home/Home.js';
import Checkout from './Reservation/Checkout.js';
import AddTheater from './Theaters/AddTheater.js';
import DashBoard from '../Dashboard/Dashboard.js';
import AddPayment from '../mainpages/Payment/AddPayment';
import DisplayReservation from './Reservation/DisplayReservation.js';
import { GlobalState } from '../../GlobalState.js'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged,setIsLogged ] = state.UserAPI.isLogged
     const [isAdmin,setIsAdmin ] = state.UserAPI.isAdmin


  return (
    <Container maxWidth="lg">
      <Switch>
        <Route path="/auth" exact component={isLogged ? NotFound : Auth}/>
        <Route path="/cart" exact component={isLogged ? Cart : NotFound}/>
        <Route path="/" exact component={Home}/>
        <Route path="/displayMovies" exact component={isLogged ?  DisplayMovie : NotFound }/>
        <Route path="/addMovie" exact component={isAdmin ? AddMovie :NotFound}/>
        <Route path="/movieDetails" exact component={isLogged ?  MovieDetails:NotFound}/>
        <Route path="/updateMovie" exact component={isAdmin ? UpdateMovie:NotFound}/>
        <Route path="/homeMovie" exact component={isLogged ? HomeDisplayMovies:NotFound}/>
        <Route path="/checkout"  component={isLogged ? Checkout:NotFound}/>
        <Route path="/addTheater"  component={isAdmin ? AddTheater :NotFound}/>
        <Route path="/dashboard"  component={isAdmin ?DashBoard :NotFound}/>
        <Route path="/addPayment" component={isLogged ?AddPayment:NotFound}/>
         <Route path="/reservation" component={isLogged ?DisplayReservation:NotFound}/>

        <Route path="*" exact component={NotFound}/>
      </Switch>
    </Container>
  )
}

export default Pages