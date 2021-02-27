import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    position: fixed;
    overflow: hidden;
  }

  button:hover {
    outline:none;
  }

  button:focus {
    outline:none;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }
}

  #primary-container {
    /* SIDEBARS */
    display: grid;
    grid-column-gap: 0;
    width: 100vw;
    height: 100vh;

    @media (min-width: ${({ theme }) => theme.bp[4]}) {
      grid-template-areas:
        "leftSide appBarArea   rightSide"
        "leftSide cardArea rightSide";
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto 1fr;
    }

    @media (max-width: ${({ theme }) => theme.bp[4]}) {
      grid-template-areas:
        "appBarArea"
        "cardArea";
      grid-template-columns: auto;
      grid-template-rows: auto 1fr;
    }
  }
`;

export default GlobalStyle;

/*
@media only screen and (max-width: 600px)  {...}
What this query really means, is “If [device width] is less than or equal to 600px, then do {…}”
(the max width that the following rules will apply for)

@media only screen and (min-width: 600px)  {...}
What this query really means, is “If [device width] is greater than or equal to 600px, then do {…}”
(the min width that the following rules will apply for)


                SIZE ALONG HORIZONTAL AXIS
—————————————————————————————————————————————————————————————
  1rem + 1rem + 19rem + 1rem ││ 1rem + 20rem + 1rem + 1rem
—————————————————————————————————————————————————————————————
                LCard                  RCard


// Note that conditional rendering requires
// a container component (e.g., div).

  @media screen and (max-width: 600rem) {
    div.example {
      display: none;
    }
  }

// IF GREATER THAN OR EQUAL TO
  @media (min-width: ____rem) {
  }

// IF LESS THAN OR EQUAL TO
  @media (max-width: ____rem) {
  }

// IF BETWEEN
  @media (min-width: ____rem) and (max-width: ____rem) {
  }

// IF 'LANDSCAPE' MODE
  @media only screen and (orientation: landscape) {
    body {
    }
  }

// MULTIPLE ALTERNATIVE CONDITIONS
// Comma behaves like || statement.
  @media screen and (max-width: 900rem) and (min-width: 600rem), (min-width: 1100rem) {
    div.example {
    }
  }

*/
