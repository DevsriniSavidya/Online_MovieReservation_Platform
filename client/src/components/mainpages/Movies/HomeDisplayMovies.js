import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Button, CardActions } from "@material-ui/core";
import { GlobalState } from "../../../GlobalState.js";

const DisplayMovie = (props) => {
  const state = useContext(GlobalState);
  const [request, setRequest] = useState([]);
  const [alert, setAlert] = useState(false);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;

  useEffect(() => {
    axios
      .get("http://localhost:8280/movie/get")
      .then((res) => {
        setRequest(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const setData = (data) => {
    let {
      _id,
      name,
      description,
      showTime,
      theaters,
      ticketPrice,
      filmType,
      photo,
    } = data;

    localStorage.setItem("ID", _id);
    localStorage.setItem("name", name);
    localStorage.setItem("description", description);
    localStorage.setItem("showTime", JSON.stringify(showTime));
    localStorage.setItem("theaters", JSON.stringify(theaters));
    localStorage.setItem("ticketPrice", ticketPrice);
    localStorage.setItem("filmType", filmType);
    localStorage.setItem("photo", photo);
  };

  //search
  const filterData = (Movie, searchkey) => {
    const result = Movie.filter(
      (movie) =>
        movie.name.toLowerCase().includes(searchkey) ||
        movie.name.includes(searchkey)
    );

    setRequest(result);
  };
  function handleSearchArea(e) {
    const searchkey = e.currentTarget.value;
    axios.get("http://localhost:8280/movie/get").then((res) => {
      if (res.data) {
        filterData(res.data, searchkey);
      }
    });
  }

  return (
    <Container>
      <h4>
        <center>MOVIES</center>
      </h4>

      <div>
        <Search>
          <input
            className="form-control"
            type="search"
            placeholder="search"
            name="searchQuery"
            onChange={handleSearchArea}
          ></input>
        </Search>
      </div>
      {isLogged ? (
        <Content>
          {request.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}
              <Link to={`/movieDetails/`} onClick={() => setData(movie)}>
                <img src={movie.photo} alt={movie.name} />
              </Link>
              <Name>{movie.name}</Name>
            </Wrap>
          ))}
        </Content>
      ) : (
        <Content>
          {request.map((movie, key) => (
            <Wrap key={key}>
              {movie.id}

              <img src={movie.photo} alt={movie.name} />
            </Wrap>
          ))}
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
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

const Search = styled.div`
  width: 30vh;
  margin-top: 5vh;
  margin-bottom: 5vh;
  margin-left: 0vh;
`;
const Name = styled.div`
  margin-top: 30px;
  margin-left: 5vh;
  margin-bottom:5vh
  line-height: 1.4;
  font-size: 20px;
  font-weight:bold;
  padding: 0px 0px;
  color: #00004d;
  font-weight: thicker;
  @media (max-width: 768px) {
    font-size: 14px;
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
    height: 80%;
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

export default DisplayMovie;
