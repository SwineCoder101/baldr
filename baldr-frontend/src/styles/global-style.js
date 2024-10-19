import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const CustomClass = `
  .f-row {
    display: flex;
    flex-direction: row;
  }
  
  .f-col {
    display: flex;
    flex-direction: column;
  }

  .f-spb {
    display: flex;
    justify-content: space-between;
  }

  .hc {
    display: flex;
    text-align: center;
    justify-content: center;
  }

  .vc {
    display: flex;
    align-items: center;
  }

  .small-pd {
    padding: 1rem;
  }

  .big-pd {
    padding: 1.8rem;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${reset}
  ${CustomClass}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    width: 100vw;
    height: 100vh;
    font-size: 80%;
  }

  body, #root {
    width: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    text-decoration: none;
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .scroll {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  input {
    outline: none;
    border: none;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  select::-ms-expand {
    display: none;
  }

  // For mobile view
  @media (max-width: 768px) {
    html {
      width: 100%;
    }

    body, #root {
      width: 100%;
    }
  }
`;
