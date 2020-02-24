/* eslint-disable react/forbid-prop-types */
// import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as EmailValidator from 'email-validator';
import { FormButton, ProgressBar } from 'components';
import { demoMode, demoUser, demoPassword } from 'config';
import { withStyles } from '@material-ui/core/styles';
import Promise from 'bluebird';

const styles = {};
// const debug = Debug('src:components:auth-form');

const S = {};

S.Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.p(2)}
           ${props => props.theme.p(2)};
`;

S.TextField = styled(TextField)`
  margin: ${props => props.theme.m(1.2)}
          ${props => props.theme.m(2)};
  padding-right: ${props => props.theme.p(0)};
  .MuiIconButton-root {
    padding: ${props => props.theme.p(0.75)};
  }
  .MuiOutlinedInput-root {
    padding: ${props => props.theme.p(0.75)};
    padding-right: ${props => props.theme.p(0.70)};
  }
`;

S.ButtonBox = styled(FormGroup)`
  align-self: flex-end;
  margin-top: ${props => props.theme.m(1)};
  margin-right: ${props => props.theme.p(1)};
`;

S.ProgressBarBox = styled(FormGroup)`
  width: auto;
  height: 4px;
  margin-top: ${props => props.theme.m(2)};
  margin-bottom: ${props => props.theme.m(0)};
  margin-left: ${props => props.theme.m(-2)};
  margin-right: ${props => props.theme.m(-2)};
`;

class AuthForm extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    autocompletePasswordType: PropTypes.string.isRequired,
  };

  state = {
    username: demoMode ? demoUser : '',
    password: demoMode ? demoPassword : '',
    notAnEmailAddressError: false,
    loading: false,
    passwordError: false,
    showPassword: false,
  };

  handleFormSubmit = (event) => {
    const { handleSubmit } = this.props;
    const { username, password } = this.state;
    const handleSubmitAsync = Promise.promisify(handleSubmit);

    if (!EmailValidator.validate(username) || password === '') {
      return this.setState({
        notAnEmailAddressError: !EmailValidator.validate(username),
        passwordError: !password,
      });
    }

    this.setState({ loading: true });
    event.preventDefault();

  // Hang the ProgressBar:
  // const setTimeoutAsync = Promise.promisify(setTimeout);
  // setTimeoutAsync(() => console.log('waiting'), 2000 ).then(() => {
    return handleSubmitAsync(username, password)
    .then(() => this.setState({
      username: demoUser,
      password: demoPassword,
      notAnEmailAddressError: false,
      passwordError: false,
      showPassword: false,
    }));
  // });
  }

  handleChange = prop => (event) => {
    const { notAnEmailAddressError, passwordError } = this.state;

    if (prop === 'username' && notAnEmailAddressError === true) {
      this.setState({ notAnEmailAddressError: !EmailValidator.validate(event.target.value) });
    } else if (prop === 'password' && passwordError) {
      this.setState({ passwordError: !event.target.value });
    }

    return this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => (
    this.setState(state => ({ showPassword: !state.showPassword }))
  );

  render() {
    const { autocompletePasswordType } = this.props;
    const {
      username,
      notAnEmailAddressError,
      loading,
      password,
      passwordError,
      showPassword,
    } = this.state;

    return (
      <S.Form
        autoComplete='off'
        fullScreen
      >
        <S.TextField
          id='outlined-email-as-username-input'
          label='Email'
          autoComplete='email'
          error={notAnEmailAddressError}
          name='username'
          onChange={this.handleChange('username')}
          type='username'
          value={username}
          variant='outlined'
        />
        <S.TextField
          id='outlined-adornment-password'
          label='Password'
          autoComplete={autocompletePasswordType}
          error={passwordError}
          onChange={this.handleChange('password')}
          type={showPassword ? 'text' : 'password'}
          value={password}
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='Toggle password visibility'
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <S.ButtonBox>
          <FormButton
            type='submit'
            handleSubmit={this.handleFormSubmit}
          >
            Submit
          </FormButton>
        </S.ButtonBox>
        <S.ProgressBarBox>
          <ProgressBar loading={loading} />
        </S.ProgressBarBox>
      </S.Form>
    );
  }
}

export default withStyles(styles)(AuthForm);
