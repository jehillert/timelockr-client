import * as Debug from 'debug';

const axios = require('axios');
const debug = Debug('src:client-requests');
const urlBase = `${process.env.API_HOST || 'http://localhost:3000'}/api/db`;

// ENTRY REQUESTS
export const deleteEntry = entryId => axios.delete(`${urlBase}/entries`, { data: { entryId } })
  .then(res => debug(res.data))
  .catch(err => debug(err));

export const createEntry = entry => axios.post(`${urlBase}/entries`, {
  userId: entry.userId,
  creationDate: entry.creationDate,
  releaseDate: entry.releaseDate,
  description: entry.description,
  content: entry.content,
}).then(response => debug(response.data))
  .catch(err => debug(err));

export const getEntries = user => axios
  .get(`${urlBase}/entries?username=${user}`)
  .then((results) => {
    const entries = JSON.parse(results.request.response);
    return entries;
  })
  .catch(err => debug(err));

/* 1 */
export const extendReleaseDate = (entryId, releaseDate) => axios
  .put(`${urlBase}/entries`, {
    data: { entryId, releaseDate },
  })
    .then(response => response)
    .catch((err) => {
      if (err.statusCode === 400) {
        return {
          userCreated: false,
          message: 'Failed to update/extend releaseDate',
        };
      }
      return debug(err);
    });

// USER REQUESTS
export const addUser = (user, pass) => axios.post(`${urlBase}/signup`, {
    username: user,
    password: pass,
  })
    .then(response => response)
    .catch((err) => {
      if (err.statusCode === 409) {
        return { userCreated: false, message: 'Username taken.  Please select another' };
      }
      return debug(err);
    });

export const deleteUser = user => axios.post(`${urlBase}/signup`, {
    username: user,
  })
    .then(response => response)
    .then(res => debug(res.data))
    .catch(err => debug(err));

export const verifyUser = (user, pass) => axios.post(`${urlBase}/signin`, {
    username: user,
    password: pass,
  })
  .then((result) => {
    debug(result);
    debug(`User authenticated.\nuserId: ${result.data.userId}`);
    const authData = {
      userId: result.data.userId,
      hasAuth: true,
    };
    return authData;
  })
  .catch(err => debug(`Failed to authenticate user.\n${err}`));

/*
  [1] For a PUT request: HTTP 200 or HTTP 204 should imply 'resource updated successfully'.
*/
