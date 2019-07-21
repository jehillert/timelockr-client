'SET_LOGIN_STATE'
'GET_LOGIN_STATE'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATE':

    case 'GET_LOGIN_STATE':

    default:
      return state;
 }
}

export default userReducer;






const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return axios.post(`${urlBase}/signup`, {
        username: user,
        password: pass,
    }).then(response => response)
      .catch((err) => {
        if (err.statusCode === 409) {
          return {
            userCreated: false,
            message: 'Username taken.  Please select another'
          };
        }
        return debug(err);
      });
    case 'VERIFY_USER':
      return axios.post(`${urlBase}/signin`, {
          username: action.user,
          password: action.pass,
        }).then((result) => {
            debug(result);
            debug(`User authenticated.\nuserId: ${result.data.userId}`);
            const authData = {
              userId: result.data.userId,
              isAuthorized: true,
            };
            return authData;
          }).catch(err => debug(`Failed to authenticate user.\n${err}`));
    default:
      return state;
 }
}

export default userReducer;


