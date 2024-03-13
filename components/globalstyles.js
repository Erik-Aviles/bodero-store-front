import { createGlobalStyle } from "styled-components";
import { BackgroundColor } from "@/lib/colors";

const GlobalStyle = createGlobalStyle`
html,body{
    background-color: ${BackgroundColor};
    padding:0;
    margin:0;
    outline: none;
    font-family: 'Poppins', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
      box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
    white-space: nowrap;
    padding: 0;
  }

  li {
    display: inline;
  }

  img{
      object-fit: cover;
    }
   
  `;
export default GlobalStyle;
