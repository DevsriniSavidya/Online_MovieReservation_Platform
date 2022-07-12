import React,{ useState, useContext} from 'react'
import { GlobalState } from '../../GlobalState.js'
import styled from "styled-components";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Avatar } from '@material-ui/core'
import axios from 'axios';
import UserAPI from '../../api/UserAPI.js';

function Header() {

    const state = useContext(GlobalState)
    const [isLogged,setIsLogged ] = state.UserAPI.isLogged
    const [isAdmin,setIsAdmin ] = state.UserAPI.isAdmin
    const [crrUser, setCrrUser] = state.UserAPI.crrUser
    const [cart] = state.UserAPI.cart

     const[resl,setResult] = useState([]);

    const logoutUser = async () =>{
      const logout = await axios.get('/user/logout')
      localStorage.clear()
      setIsAdmin(false)
      setIsLogged(false)
      window.location.reload(false)
    }

    

  return (
    <Nav>
    <Logo>
       <img src='/images/movie-icon.svg' alt='movie' />
    </Logo>

    <NavMenu>
        <a href='/'>
           <img src='/images/home-icon.svg' alt='home'/>
           <span>HOME</span>
        </a>
      
        {/* <a href='/'>
           <img src='/images/watchlist-icon.svg' alt='watchlist'/>
           <span>WATCHLIST</span>
        </a> */}
        {isAdmin ?
        <a href='/dashboard'>
           <img src='/images/original-icon.svg' alt='original'/>
           <span>DashBoard</span>
        </a> :''}

        <a href='/homeMovie'>
           <img src='/images/movie-icon.svg' alt='move'/>
           <span>MOVIES</span>
        </a>
        
        <a href='/reservation'>
           <img src='/images/series-icon.svg' alt='series'/>
           <span>Reserved</span>
        </a>

        <div>{isLogged? <Logout onClick={logoutUser}>Logout</Logout>:''
        }</div>

        <Cart>
          <div>{isLogged?<Cartcount> <span>{cart.length}</span> </Cartcount>:''}</div>
        <div>{isLogged?
        <a href='/cart'>
        <img src='/images/carti.png' alt='series'/>
        </a>:''}
        </div>
        </Cart>
    </NavMenu>
    <div>{isLogged?
    <Avatar alt={crrUser.name} ></Avatar>:
    <Login><a  href='/auth'>Login</a></Login>}
    </div>
</Nav>
  )
}

const Nav = styled.nav`
 position : sticky ;
 top:0;
 left :0;
 right:0;
 height :70px;
 background-color:#090b13;
 display:flex;
 justify-content:space-between;
 align-items:center;
 padding:0 36px;
 letter-spacing:16px;
 z-index:3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

/* To show underline bar when mouse is pointed*/
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    text-decoration: none;
    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 16px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;
      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  /* @media (max-width: 768px) {
    display: none;
  } */
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  cursor:pointer;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Logout = styled.a`
  background-color: #f9f9f9;
  padding: 8px 16px;
  position: absolute;
  top: 20px;
  right: -600px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  cursor:pointer;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
 height:100%;
`;


const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const Cart = styled.a`
position: absolute;
right: -480px;
`;

const Cartcount = styled.a`
background: crimson;
border-radius: 20px;
color: white;
position: absolute;
top: -15px;
right: -5px;
padding: 5px 7px;
font-size: 10px;
`;

export default Header