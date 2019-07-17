/* eslint-disable no-unused-vars */
import * as Debug from 'debug';
import { hot } from 'react-hot-loader/root';
import { setConfig } from 'react-hot-loader';
import * as React from 'react';
import { AppWrapper, AuthModal, Main } from 'components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { addUser, getEntries, verifyUser } from 'utilities';
import { defaultTheme, GlobalStyle } from 'theme';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { serverConsoleUrl } from 'config';
import { closeConsole, openConsole } from './AppConsole';

const debug = Debug('src:components:app');

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

  // TimeLockr Console code is placed in AppWrapper

  refresh = () => (
    this.getEntries()
  );

  revokeAuth = () => (
    this.setState(state => ({
      hasAuth: false,
      showMain: false,
      entries: {},
    }))
  )

  handleSignin = (user, pass) => (
    verifyUser(user, pass)
      .then((result) => {
        debug(result);
        return this.setState(state => ({
          userId: result.userId,
          username: user,
          hasAuth: result.hasAuth,
        }));
      })
      .then(() => this.getEntries())
      .then(() => {
        this.setState(state => ({ showMain: state.hasAuth }));
      })
  )

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
        <AppWrapper>
          <Router>
            <Route
              exact
              path='/'
              render={() => (
                showMain ? (
                  <Main
                    entries={entries}
                    hasAuth={hasAuth}
                    refresh={this.refresh}
                    revokeAuth={this.revokeAuth}
                    userId={userId}
                    username={username}
                  />
                ) : (
                  <AuthModal
                    handleSignin={this.handleSignin}
                    handleAddUser={this.handleAddUser}
                    hasAuth={hasAuth}
                  />
                )
              )}
            />
          </Router>
        </AppWrapper>
      </>
    );
  }
}

setConfig({
  logLevel: 'debug',
  hotHooks: true,
});

export default hot(App);
