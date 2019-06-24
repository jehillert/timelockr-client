/* eslint-disable react/forbid-prop-types */
import React from 'react';
import chalk from 'chalk';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as EmailValidator from 'email-validator';
import { Box, FormButton } from 'components';
import { withStyles } from '@material-ui/core/styles';
import Promise from 'bluebird';

const S = {};
S.Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1.5rem;
`;

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  onRight: {
    alignSelf: 'flex-end',
  },
});

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(chalk.hex('#000000').bgHex('#38A53C')(process.env.API_HOST));
    this.state = {
      username: '',
      password: '',
      notAnEmailAddressError: false,
      passwordError: false,
      showPassword: false,
    };
  }

  handleSubmit = (event) => {
    const { handleSubmit } = this.props;
    const { username, password } = this.state;
    const handleSubmitAsync = Promise.promisify(handleSubmit);

    if (!EmailValidator.validate(username) || password === '') {
      return this.setState({
        notAnEmailAddressError: !EmailValidator.validate(username),
        passwordError: !password,
      });
    }

    event.preventDefault();
    return handleSubmitAsync(username, password)
      .then(state => this.setState({
        username: '',
        password: '',
        notAnEmailAddressError: false,
        passwordError: false,
        showPassword: false,
      }));
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
    const { autocompletePasswordType, classes } = this.props;
    const {
      username,
      notAnEmailAddressError,
      password,
      passwordError,
      showPassword,
    } = this.state;

    return (
      <S.Form autoComplete='off'>
        <TextField
          id='outlined-email-as-username-input'
          label='Email'
          autoComplete='email'
          className={classNames(classes.dense, classes.margin, classes.textField)}
          error={notAnEmailAddressError}
          margin='dense'
          name='username'
          onChange={this.handleChange('username')}
          type='username'
          value={username}
          variant='outlined'
        />
        <TextField
          id='outlined-adornment-password'
          label='Password'
          autoComplete={autocompletePasswordType}
          className={classNames(classes.dense, classes.margin, classes.textField)}
          error={passwordError}
          margin='dense'
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
        <Box
          className={classNames(classes.dense, classes.textField, classes.onRight)}
        >
          <FormButton
            type='submit'
            handleSubmit={this.handleSubmit}
          >
            Submit
          </FormButton>
        </Box>
      </S.Form>
    );
  }
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  autocompletePasswordType: PropTypes.string.isRequired,
};

export default withStyles(styles)(AuthForm);
