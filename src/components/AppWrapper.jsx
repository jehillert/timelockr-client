// TODO - add new files to aliases
// TODO - CHANGE 'getEntries' to 'fetchEntries'
// TODO - see if res.json() is the better solution for your API requests.
// TODO - look for opportunities to refactor as double arrow functions
// TODO - withAppContext.js and contexts.jsx
// TODO - fix "entries.entries" terminology
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import { defaultTheme, GlobalStyle } from 'theme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { serverConsoleUrl, showServerConsole } from 'config';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { isDesktop } from 'utilities';
import openConsole from './AppConsole';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AppConsole: {},
    };
  }

  componentDidMount() {
    if (isDesktop && showServerConsole) {
      this.setState({
        AppConsole: openConsole(
          serverConsoleUrl,
          'TimeLockrServerDemoPopupWindow',
          800,
          400,
        ),
      });
    }
  }

  componentWillUnmount() {
    const { AppConsole } = this.state;
    AppConsole.close();
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <CssBaseline />
        <ThemeProvider theme={defaultTheme}>
          <StylesProvider injectFirst>
            <GlobalStyle />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              {children}
            </MuiPickersUtilsProvider>
          </StylesProvider>
        </ThemeProvider>
      </>
    );
  }
}

AppWrapper.defaultProps = {
  children: null,
};

AppWrapper.propTypes = {
  children: PropTypes.node,
};

export default AppWrapper;
