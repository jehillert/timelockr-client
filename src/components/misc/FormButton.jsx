import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.Button = styled(Button)`
  margin: 8px;
  box-shadow: none;
  text-transform: none;
  font-size: 16;
  padding: 6px 12px;
  border: 1px solid;
  line-height: 1.5;
  color: ${props => props.theme.fgColor1};
  background-color: ${props => props.theme.bgColor2};
  border-color: ${props => props.theme.borderColor2};

  font-family: [
    '-apple-system',
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
  ];

  :hover {
    background-color: ${props => props.theme.hoverColor};
    border-color: ${props => props.theme.hoverColor};
    color: ${props => props.theme.hoverFontColor};
  }

  active: {
    box-shadow: none;
    background-color: #0062cc;
    border-color: #005cbf;
  }

  &:focus: {
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.5);
  }
`;

function FormButton(props) {
  const { children, handleSubmit } = props;
  return (
    <S.Button
      onClick={handleSubmit}
      variant='contained'
      disableRipple
    >
      {children}
    </S.Button>
  );
}

FormButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default FormButton;

// export default FormButton;
//const FormButton = (props) => (
//  <S.Button onClick={props.handleSubmit}>{props.children}</S.Button>
//);
