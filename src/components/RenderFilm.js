import React,{useState,useEffect,useReducer} from 'react';
import styled from 'styled-components';
import Layout from '../layout/Layout.js';

const FilmWrapper=styled.div`
  width: 100vw;
  height: 70vh;
  display:flex;
  align-items:center;
  font-size:${({theme})=>theme.size.big}
  justify-content: start;
  background-image: url();
  color:${({theme})=>theme.colors.white};
  position:relative;
  flex-direction: row;
  ::before{
    position:absolute;
    content:"";
    top:0;
    left:0;
    width:100vw;
    height:70vh;
    background-image:url(${({photo})=>photo});
    background-size: cover;
    filter: blur(15px);
  }
`
const MoviePosterWrapper=styled.div`
  height:100%;
  width:40%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`
const MoviePoster=styled.img`
  height: 90%;
  width: auto;
  box-shadow: #222 1vh 1vh 2vh;
`
const MovieDataWrapper=styled.div`
  width: 60%;
  height: 100%
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const DataWrapper=styled.div`
  background-color:rgba(128,128,128,50%);
  font-size: ${({theme})=>theme.size.big};
  height: 1.5em;
  min-width: 20%;
  text-shadow: #222 0.1em 0.1em 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #fff;
  margin-bottom: 4%
  overflow: hidden;
  z-index: 2;
  padding:0 2%;
  /*::before,::after{
    content:"";
    height: 1.5em;
    background-color:rgba(128,128,128,50%);
    border-bottom: 2px solid #fff;
    width: 2%;*/
  }
`
function RenderFilm({data}){
  //if(!name) return(null);
  if(!data) return null;
  return(
    <FilmWrapper photo={data.image.original}>
      <MoviePosterWrapper>
        <MoviePoster src={data.image.original}/>
      </MoviePosterWrapper>
      <MovieDataWrapper>
        <DataWrapper>Nazwa: {data.name}</DataWrapper>
        <DataWrapper>Gatunki: {data.genres.join(", ")}</DataWrapper>
        <DataWrapper>Premiera: {data.premiered}</DataWrapper>
        <DataWrapper>Kanał: {data.network.name}</DataWrapper>
      </MovieDataWrapper>
    </FilmWrapper>
  )
};
export default RenderFilm;
