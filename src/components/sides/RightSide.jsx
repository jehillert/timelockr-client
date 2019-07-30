import React from 'react';
import { Box } from 'components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.RightSide = styled(Box)`
  z-index: 999;
  @media (max-width: ${props => props.theme.bp3}) {
      display: none;
  }
  background-color: ${props => props.theme.darkColor};
  box-shadow: ${props => props.theme.boxShadowLeft};
  color: #AEAEAA;
  display: flex;
  grid-area: ${props => props.gridArea};
  overflow: visible;
  padding: ${props => props.theme.m()};
`;

const RightSide = (props) => {
  const { children, gridArea } = props;
  return (
    <S.RightSide gridArea={gridArea}>
      {children}
    </S.RightSide>
  );
};

RightSide.defaultProps = {
  children: null,
};

RightSide.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
};

S.RightSide.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default RightSide;
