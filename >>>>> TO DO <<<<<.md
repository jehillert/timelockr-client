AuthForm
Pressing escape in username field causes screen to go blank.

Box.jsx
1. where is it???
2. If you deleted it, you need to go excise it out everywhere.

GlobalStyle.jsx:
1. unmatched bracket in GlobalStyle.jsx

App.jsx:
1. Are these lines necessary?
  import { serverConsoleUrl } from 'config';
  import { closeConsole, createConsole } from './AppConsole';

clientRequests:
1. Your 'PUT' requests I think may be all wrong.
2. Reread this: https://medium.com/backticks-tildes/restful-api-design-put-vs-patch-4a061aa3ed0b
3. Either modify PUT or consider PATCH

-------------------------------------------------------
 EXPLORE USING DESTRUCTURING IN STYLED COMPONENTS
-------------------------------------------------------
https://github.com/styled-components/styled-components/issues/273
Maybe consider doing this inside all styled components that refer to the theme:
  ({ theme }) => theme.myProperty

-------------------------------------------------------
 TIMER
-------------------------------------------------------
the timer start counting from when the time form is pulled up, not from the time the submit button is hit.

-------------------------------------------------------
 LOCKED ENTRY CARDS
-------------------------------------------------------
if the title is too long, and just one word, that word pushes the menu out of sight and out of the card

-------------------------------------------------------
 CLEAN UP MEDIA QUERIES
-------------------------------------------------------
Finish replacing code like this:
  @media (max-width: ${props => props.theme.bp[4]}) {
    width: 100vw;
  }
With code like this:
  @media ${device.phone} {
    display: none;
  }
  @media ${device.desktopLG} {
    display: grid;
    margin-right: ${props => props.theme.p(1)};
  }
And then delete this from the theme:
  const bp = [
    null,
    '66rem',  // DESKTOP    -->  1056px -->  Hides 'TimeLockr'
    '51rem',  // TABLET_LG  -->  816px  -->  Relocates (+) button
    '44rem',  // TABLET_SM  -->  736px  -->  Hides side panels
    '44rem',  // TABLET_SM  -->  704px  -->  Main, AppBar, TabBar, CardAreaTabs, and CardArea --> width becomes 100%
    '31rem',  // PHONE      -->  656px
    '0rem',   // 6
  ];
And also
  {
    ...
    bp,
    ...
  }
Also consider replacing all of the "abp" code with something similar to "device"
