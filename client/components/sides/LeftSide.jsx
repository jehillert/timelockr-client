import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.LeftSide = styled.div`
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.rightBoxShadow};
  color: ${props => props.theme.textColor2};
  display: flex;
  grid-area: ${props => props.gridArea};
  justify-content: flex-end;
  overflow: visible;
  padding-right: 1rem;
  padding-top: 1rem;
  z-index: 2;
`;

const LeftSide = (props) => {
  const { children, gridArea, title } = props;
  return (
    <S.LeftSide gridArea={gridArea}>
      {title && (
        <h2>{title}</h2>
      )}
      {children}
    </S.LeftSide>
  );
};

LeftSide.defaultProps = {
  children: null,
  title: null
};

LeftSide.propTypes = {
  children: PropTypes.node,
  gridArea: PropTypes.string.isRequired,
  title: PropTypes.string,
};

S.LeftSide.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

export default LeftSide;
