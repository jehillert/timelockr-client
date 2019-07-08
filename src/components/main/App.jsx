/* eslint-disable no-unused-vars */
import * as Debug from 'debug';
import React from 'react';
import { AuthModal, Main } from 'components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { addUser, getEntries, verifyUser } from 'utilities';
import { defaultTheme, GlobalStyle } from 'theme';
import { hot } from 'react-hot-loader/root';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';

const debug = Debug('src:components:app');
debug('App Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      username: '',
      entries: {},
      hasAuth: false,
      showMain: false,
    };
  }

  getEntries = () => {
    const { username } = this.state;
    return getEntries(username)
      .then((results) => {
        const { locked, released } = results.entries;
        debug('LOCKED:\n%O', locked);
        debug('RELEASED:\n%O', released);
        return results;
      })
      .then((results) => {
        this.setState((state, props) => ({ entries: results.entries }));
      });
  }

  refresh = () => (
    this.getEntries()
  );

  revokeAuth = () => (
    this.setState(state => ({ hasAuth: false }))
  )

  handleSignin = (user, pass) => {
    debug('signing in');
    return verifyUser(user, pass) // non-zero value indicates authenticated
      .then((result) => {
        this.setState(state => ({
          userId: result.userId,
          username: user,
          hasAuth: result.hasAuth,
        }));
      })
      .then(() => this.getEntries())
      .then(() => {
        this.setState(state => ({ showMain: true }));
      });
  }

  handleAddUser = (username, password) => addUser(username, password)
    .then((response) => {
      debug(response.data);
    })

  render() {
    const {
      entries,
      hasAuth,
      showMain,
      userId,
      username,
    } = this.state;

    return (
      <>
        <CssBaseline />
        <GlobalStyle />
        <Router>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Route
              exact
              path='/'
              render={() => (
                showMain ? (
                  <ThemeProvider theme={defaultTheme}>
                    <Main
                      entries={entries}
                      hasAuth={hasAuth}
                      refresh={this.refresh}
                      revokeAuth={this.revokeAuth}
                      userId={userId}
                      username={username}
                    />
                  </ThemeProvider>
                ) : (
                  <ThemeProvider theme={defaultTheme}>
                    <AuthModal
                      handleSignin={this.handleSignin}
                      handleAddUser={this.handleAddUser}
                      hasAuth={hasAuth}
                    />
                  </ThemeProvider>
                  )
              )}
            />
          </MuiPickersUtilsProvider>
        </Router>
      </>
    );
  }
}

export default hot(App);
// export default hot(module)(App);
// export default App;
