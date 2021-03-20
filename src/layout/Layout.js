import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import {theme} from '../utils/theme.js';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat';
    color: ${({theme})=>theme.colors.white};
    background-color:${({theme})=>theme.colors.dark}
  }

  *, *::before, *::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
`;
const StyleWrapper=styled.div`
  display:flex;
  justify-content:center;
  flex-direction: column;
`
const Layout = ({children}) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle/>
      <StyleWrapper>
        {children}
      </StyleWrapper>
    </>
  </ThemeProvider>
);
export default Layout;
