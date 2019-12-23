import * as Debug from 'debug';
import axios from 'axios';
import { hostUrl } from 'config';
import { FETCH_ENTRIES } from 'types';

const debug = Debug('src:auth-actions');
const urlBase = `${hostUrl}/api/db`;

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
  debug(`User authenticated.\nuserId: ${result.data.userId}`);
  const data = JSON.parse(result.config.data);
  const authData = {
    userId: result.data.userId,
    username: data.username,
    hasAuth: true,
  };
  return authData;
})
.catch(err => debug(`Failed to authenticate user.\n${err}`));
