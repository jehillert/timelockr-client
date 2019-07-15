import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'components';

const S = {};

S.LeftSide = styled.div`
  @media (max-width: 46rem) {
      display: none;
  }
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

S.Title = styled.h2`
  @media (max-width: 66rem) {
    display: none;
  }
`;

const LeftSide = (props) => {
  const { children, gridArea, title } = props;
  return (
    <S.LeftSide gridArea={gridArea}>
      {title && (
        <S.Title>{title}</S.Title>
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
