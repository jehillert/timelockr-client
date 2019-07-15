import React from 'react';
import { Box } from 'components';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.RightSide = styled(Box)`
  @media (max-width: 46rem) {
      display: none;
  }
  background-color: ${props => props.theme.secondaryColor};
  box-shadow: ${props => props.theme.leftBoxShadow};
  color: #AEAEAA;
  display: flex;
  grid-area: ${props => props.gridArea};
  overflow: visible;
  z-index: 2;
`;

S.ButtonBox = styled(Box)`
  @media (max-width: 51rem) {
    display: none;
  }
  padding: ${props => props.theme.sp};
`;

const RightSide = (props) => {
  const { children, gridArea } = props;
  return (
    <S.RightSide className='s-right-side' gridArea={gridArea}>
      <S.ButtonBox>
        {children}
      </S.ButtonBox>
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
