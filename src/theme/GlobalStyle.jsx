import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y:hidden
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  .grid-desktop {
    display: grid;
    grid-column-gap: 0;
    grid-template-areas:
      "leftSide appBar   rightSide"
      "leftSide cardArea rightSide";
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto 1fr;
    width: 100vw;
    height: 100vh;
  }

`;

export default GlobalStyle;

// 1rem + 1rem + 19rem + 1rem || 1rem + 20rem + 1rem + 1rem
//               LCard                  RCard
