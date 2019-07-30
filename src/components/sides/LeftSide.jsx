import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.LeftSide = styled.div`
  z-index: 999;
  @media (max-width: ${props => props.theme.bp3}) {
      display: none;
  }
  background-color: ${props => props.theme.darkColor};
  box-shadow: ${props => props.theme.boxShadowRight};
  color: ${props => props.theme.textColor2};
  display: flex;
  grid-area: ${props => props.gridArea};
  justify-content: flex-end;
  overflow: visible;
  padding-right: ${props => props.theme.m()};
  padding-top: ${props => props.theme.m(2)};
`;

S.Title = styled.h2`
  @media (max-width: ${props => props.theme.bp1}) {
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
  title: null,
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
