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

const debug = Debug('src:client-requests');
const urlBase = `${hostUrl}/api/db`;

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
    .then(response => {
      let data = JSON.parse(response.config.data);
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

export const logout = () => axios.get(`${urlBase}/logout`)
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
NOTES:
  [1] For a PUT request: HTTP 200 or HTTP 204 should imply 'resource updated successfully'.

RESPONSE OBJECTS:
  [1] extendReleaseDate():
      RESPONSE:
        {
          "data": "Created",
          "status": 201,
          "statusText": "Created",
          "headers": {
            "content-type": "text/plain; charset=utf-8"
          },
          "config": {
            "url": "http://timelockr-server-demo.herokuapp.com/api/db/entries",
            "method": "put",
            "data": "{\"data\":{\"entryId\":1549,\"releaseDate\":\"2019-07-21 16:11-00\"}}", <<< THIS JSON NEEDS TO BE PARSED
            "headers": {
              "Accept": "application/json, text/plain, **",
              "Content-Type": "application/json;charset=utf-8"
            },
            "transformRequest": [
              null
            ],
            "transformResponse": [
              null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1
          },
          "request": {}
        }

      CONFIG:
      {
        "url": "http://timelockr-server-demo.herokuapp.com/api/db/entries",
        "method": "put",
        "data": "{\"data\":{\"entryId\":1549,\"releaseDate\":\"2019-07-21 16:09-00\"}}",
        "headers": {
          "Accept": "application/json, text/plain, ",
          "Content-Type": "application/json;charset=utf-8"
        },
        "transformRequest": [
          null
        ],
        "transformResponse": [
          null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1
      }


  [2] verifyUser():
      {
        "data": {
          "userId": 1
        },
        "status": 202,
        "statusText": "Accepted",
        "headers": {
          "content-type": "application/json; charset=utf-8"
        },
        "config": {
          "url": "http://timelockr-server-demo.herokuapp.com/api/db/signin",
          "method": "post",
          "data": "{\"username\":\"guest@timelockr-demo.com\",\"password\":\"password\"}",
          "headers": {
            "Accept": "application/json, text/plain, ",
            "Content-Type": "application/json;charset=utf-8"
          },
          "transformRequest": [
            null
          ],
          "transformResponse": [
            null
          ],
          "timeout": 0,
          "xsrfCookieName": "XSRF-TOKEN",
          "xsrfHeaderName": "X-XSRF-TOKEN",
          "maxContentLength": -1
        },
        "request": {}
      }
*/
