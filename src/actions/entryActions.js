import * as Debug from 'debug';
import axios from 'axios';
import { hostUrl } from 'config';
import { FETCH_ENTRIES, ADD_ENTRY } from './types';

const debug = Debug('src:client-requests');
const urlBase = `${hostUrl}/api/db`;

// export const fetchEntries = user => dispatch => axios
//   .get(`${urlBase}/entries?username=${user}`)
//   .then(results => JSON.parse(results.request.response))
//   .then(entries => dispatch({
//     type: FETCH_ENTRIES,
//     payload: entries,
//   }))
//   .catch(err => debug(err));

// eslint-disable-next-line import/prefer-default-export
// export const fetchEntries = user => axios
//   .get(`${urlBase}/entries?username=${user}`)
//   .then((results) => {
//     const entries = JSON.parse(results.request.response);
//     console.log('RESULTS RESULTS RESULTS ----------------------------------', entries);
//     return entries;
//   })
//   .catch(err => debug(err));

// eslint-disable-next-line import/prefer-default-export
export const fetchEntries = user => dispatch => axios
  .get(`${urlBase}/entries?username=${user}`)
  .then((results) => {
    const entries = JSON.parse(results.request.response);
    console.log('RESULTS RESULTS RESULTS ----------------------------------', entries);
    return entries;
  })
.then(entries => dispatch({
  type: FETCH_ENTRIES,
  payload: entries,
}))
.catch(err => debug(err));
