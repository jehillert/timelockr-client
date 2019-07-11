import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import { defaultTheme, GlobalStyle } from 'theme';
import { hot } from 'react-hot-loader/root';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { serverConsoleUrl } from 'config';
import { StylesProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { closeConsole, openConsole } from './AppConsole';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AppConsole: {},
    };
  }

  componentDidMount() {
    this.setState({
      AppConsole: openConsole(
        serverConsoleUrl,
        'TimeLockrServerDemoPopupWindow',
        500,
        415,
      ),
    });
  }

  componentWillUnmount() {
    closeConsole();
  }

  render() {
    const { render } = this.props;

    return (
      <>
        <CssBaseline />
        <GlobalStyle />
        <StylesProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              {render(this.state)}
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </StylesProvider>
      </>
    );
  }
}

AppWrapper.propTypes = {
  render: PropTypes.func.isRequired,
};

export default hot(AppWrapper);
