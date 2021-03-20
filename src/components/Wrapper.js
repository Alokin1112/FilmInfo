import React,{useState,useEffect,useReducer} from 'react';
import styled from 'styled-components';
import Layout from '../layout/Layout.js';
import RenderFilm from './RenderFilm.js';
const Header=styled.div`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
const H1=styled.h1`
  color:${({theme})=>theme.colors.white};
  font-size:${({theme})=>theme.size.extraBig};
  border: 2px solid ${({theme})=>theme.colors.side};
  border-radius: 15px;
  padding: 10px;
  height:1.2em;
  display:flex;
  align-items: center;
  justify-content: center;
`
const SearchWrapper=styled.div`
  width: 100vw;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Input=styled.input`
  width: 30%;
  height: 5vh;
  background-color: transparent;
  border:2px solid ${({theme})=>theme.colors.primary};
  border-radius:15px;
  color:${({theme})=>theme.colors.side};
  font-size: 4vh;
  text-align: center;
  :focus{
    outline: none;
  }
`
const SubmitButton=styled.button`
  width: 15vw;
  height: 5vh;
  border: 2px solid ${({theme})=>theme.colors.primary};
  background-color: transparent;
  color:${({theme})=>theme.colors.primary}
  font-size: 4vh
  border-radius:15px;
  margin-top: 2vh;
  :hover{
    cursor: pointer;
  }
  :focus{
    outline:none;
  }
`
const FilmsWrapper=styled.div`
  width: 100vw;
  height: 40vh;
  display: flex;
  justify-content: center;
`
function Wrapper() {

const[input,setInput]=useState('');
const[movie,setMovie]=useState(null);
const handleInputChange=(event)=>{
  const{value}=event.target;
  setInput(value);
};
const handleButtonClick=()=>{
  setMovie(input);
  setInput("");
};
function dataFetchReducer(state,action){
   switch (action.type) {
     case "Fetch_Start" :
       return{...state,loading:true};
     case "Fetch_Success":
       return{
         ...state,
         data:action.data,
         loading:false,
       };
     case "Fetch_Failed":
       return{
       ...state,
       data:null,
       loading:false,
       error: action.error
     };
   }
 }
 const [state,dispatch]=useReducer(
   dataFetchReducer,
   {
     data:null,
     error:null,
     loading:true,
   }
 )
 useEffect(()=>{
   if(movie){
   const myFetch=async()=>{
     dispatch({type:"Fetch_Start"});
     try{
       const response= await fetch(`http://api.tvmaze.com/singlesearch/shows?q=${movie}`);
       const responseParsed= await response.json();
       dispatch({type:"Fetch_Success",data:responseParsed});
     }catch(error){
       dispatch({type:"Fetch_Failed",error:error});
     }
   }
 myFetch();
}},[movie])
return (
  <Layout>
    <Header><H1>Najlepsza strona z filmami</H1></Header>
    <SearchWrapper>
      <Input
        placeholder="Jaki film chcesz wyszukać: "
        name="searchFilm"
        value={input}
        onChange={handleInputChange}
      />
      <SubmitButton onClick={handleButtonClick}>Wyszukaj</SubmitButton>
    </SearchWrapper>
    <FilmsWrapper>
      <RenderFilm data={state.data}/>
    </FilmsWrapper>
  </Layout>
  );
}

export default Wrapper;
