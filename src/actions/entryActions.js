import * as Debug from 'debug';
import axios from 'axios';
import { hostUrl } from 'config';
import { FETCH_ENTRIES } from './types';
// import { FETCH_ENTRIES, ADD_ENTRY } from './types';

const debug = Debug('src:client-requests');
const urlBase = `${hostUrl}/api/db`;

// eslint-disable-next-line import/prefer-default-export
export const fetchEntries = user => dispatch => axios
  .get(`${urlBase}/entries?username=${user}`)
  .then((results) => {
    const { entries } = results.data;
    return dispatch({
      type: FETCH_ENTRIES,
      payload: entries,
    });
  })
  .catch(err => debug(err));
