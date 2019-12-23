/*
README:
  To copy an object from DevTools in pretty print, follow these steps:
    > right click on object
    > select "Store as a Global Variable"
    > type in the console:
        copy(temp1)
    > press Enter
    > paste clipboard somewhere.
*/
import * as Debug from 'debug';
import axios from 'axios';
import { hostUrl } from 'config';
import { FETCH_ENTRIES } from 'types';
// import { FETCH_ENTRIES, ADD_ENTRY } from 'types';

const debug = Debug('src:entry-actions');
const urlBase = `${hostUrl}/api/db`;

// eslint-disable-next-line import/prefer-default-export
export const fetchEntries = user => dispatch => axios
  .get(`${urlBase}/entries?username=${user}`)
  .then(results => dispatch({
    type: FETCH_ENTRIES,
    payload: results.data.entries,
  }))
  .catch(err => debug(err));

export const addEntry = entry => dispatch => axios
  .post(`${urlBase}/entries`, {
    userId: entry.userId,
    creationDate: entry.creationDate,
    releaseDate: entry.releaseDate,
    description: entry.description,
    content: entry.content,
  })
  .then((response) => {
    debug('=============================================================', response.data);
  })
  .catch(err => debug(err));

export const deleteEntry = entryId => axios.delete(`${urlBase}/entries`, { data: { entryId } })
  .then(res => debug(res.data))
  .catch(err => debug(err));

export const extendReleaseDate = (entryId, releaseDate) => axios
  .put(`${urlBase}/entries`, {
    data: { entryId, releaseDate },
  })
    .then((response) => {
      const data = JSON.parse(response.config.data);
      debug(data);
      return data;
    })
    .catch((err) => {
      if (err.statusCode === 400) {
        return {
          userCreated: false,
          message: 'Failed to update/extend releaseDate',
        };
      }
      return debug(err);
    });
