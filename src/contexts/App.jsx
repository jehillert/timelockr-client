/* eslint-disable react/jsx-indent */
import * as Debug from 'debug';
import React from 'react';
// import PropTypes from 'prop-types';
import { AuthModal, Main } from 'components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { addUser, verifyUser } from 'utilities';
import { compose } from 'redux';
import { defaultTheme, GlobalStyle } from 'theme';
import { hot } from 'react-hot-loader/root';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from 'styled-components';
import { AppProvider, withAppContext } from 'contexts';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';

const debug = Debug('src:components:app');
debug('App Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');

class App extends React.Component {
  render() {
    const { context } = this.props;
    const {
      entries,
      isAuthorized,
      showMain,
      userId,
      username,
    } = context;

    return (
      <>
        <AppProvider>
          <SnackbarProvider maxSnack={3}>
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
                          userId={userId}
                          username={username}
                          refresh={this.refresh}
                        />
                      </ThemeProvider>
                    ) : (
                        <ThemeProvider theme={defaultTheme}>
                          <AuthModal
                            isAuthorized={isAuthorized}
                          />
                        </ThemeProvider>
                      )
                  )}
                />
              </MuiPickersUtilsProvider>
            </Router>
          </SnackbarProvider>
        </AppProvider>
      </>
    );
  }
}

// App.defaultProps = {
//   context: null,
// };

// App.propTypes = {
//   context: PropTypes.shape({
//     entries: PropTypes.object,
//     locked: PropTypes.array,
//     released: PropTypes.array,
//     userId: PropTypes.number,
//     username: PropTypes.string,
//     isAuthorized: PropTypes.bool,
//     showMain: PropTypes.bool,
//   }),
//   refresh: PropTypes.func,
//   setUserProp: PropTypes.func.isRequired,
// };

export default hot(App);
