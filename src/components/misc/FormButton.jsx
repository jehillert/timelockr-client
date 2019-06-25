import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const styles = theme => ({
  margin: {
    margin: '8px',
  },
  bootstrapRoot: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#6A6A6A',
    borderColor: '#6A6A6A',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#D93646',
      borderColor: '#D93646',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
});

function FormButton(props) {
  const { children, classes, handleSubmit } = props;
  return (
    <Button
      onClick={handleSubmit}
      variant='contained'
      color='primary'
      disableRipple
      className={classNames(classes.margin, classes.bootstrapRoot)}
    >
      {children}
    </Button>
  );
}

FormButton.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(FormButton);

// export default FormButton;
//const FormButton = (props) => (
//  <S.Button onClick={props.handleSubmit}>{props.children}</S.Button>
//);
