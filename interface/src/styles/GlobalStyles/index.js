import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    height: 100%;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #131A35;
    color: #FFF;
    font-size: 16px;
  }
  .ant-form-item-label label {
    color: #FFF;
  }
`

export const GlobalContainer = styled.div`
  max-width: 920px;
  height: inherit;
  margin: 0 auto;
`