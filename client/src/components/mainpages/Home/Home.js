import React from 'react'
import ImgSlider from './ImgSlider'
import styled from "styled-components";
import HomeDisplayMovies from '../Movies/HomeDisplayMovies'

function Home() {
  return (
    <Container>

        <ImgSlider/>
        <HomeDisplayMovies/>
   
   </Container>
  )
}


const Container = styled.main`
  
  width: 100%;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: fixed;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home