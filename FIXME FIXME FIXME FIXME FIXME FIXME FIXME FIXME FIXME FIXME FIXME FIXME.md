Box.jsx
1. where is it???
2. If you deleted it, you need to go excise it out everywhere.

GlobalStyle.jsx:
1. unmatched bracket in GlobalStyle.jsx

App.jsx:
1. Are these lines necessary?
  import { serverConsoleUrl } from 'config';
  import { closeConsole, openConsole } from './AppConsole';

clientRequests:
1. Your 'PUT' requests I think may be all wrong.
2. Reread this: https://medium.com/backticks-tildes/restful-api-design-put-vs-patch-4a061aa3ed0b
3. Either modify PUT or consider PATCH
