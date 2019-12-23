/* eslint-disable no-unused-vars */
// Note: Appears that webpack config takes care of hot reloading.
// No need for import statements to get it to work.
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppWrapper, AuthModal, Main } from 'components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  addUser,
  ErrorBoundary,
  verifyUser,
} from 'utilities';
import { defaultTheme, GlobalStyle } from 'theme';
import './config';
import * as Debug from 'debug';
import { fetchEntries } from 'actions';

const debug = Debug('src:components:app');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      username: '',
      hasAuth: false,
      showMain: false,
    };
  }

  getEntries = () => {
    const { username } = this.state;
    const { fetchEntries } = this.props;
    return fetchEntries(username);
  }

  refresh = () => (
    this.getEntries()
  );

  revokeAuth = () => (
    this.setState(state => ({
      hasAuth: false,
      showMain: false,
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
      hasAuth,
      showMain,
      userId,
      username,
    } = this.state;

    const { entries } = this.props;

    return (
      <>
        <AppWrapper>
          <Router>
            <Route
              exact
              path='/'
              render={() => (
                showMain ? (
                  <ErrorBoundary>
                    <Main
                      entries={entries}
                      hasAuth={hasAuth}
                      refresh={this.refresh}
                      revokeAuth={this.revokeAuth}
                      userId={userId}
                      username={username}
                    />
                  </ErrorBoundary>
                ) : (
                  <ErrorBoundary>
                    <AuthModal
                      handleSignin={this.handleSignin}
                      handleAddUser={this.handleAddUser}
                      hasAuth={hasAuth}
                    />
                  </ErrorBoundary>
                )
              )}
            />
          </Router>
        </AppWrapper>
      </>
    );
  }
}

App.propTypes = {
  fetchEntries: PropTypes.func.isRequired,
  entries: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const mapStateToProps = state => ({
  entries: state.entries.entries,
});

export default connect(mapStateToProps, { fetchEntries })(App);
