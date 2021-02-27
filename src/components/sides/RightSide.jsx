import React from 'react';
import { Box } from 'components';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from 'utilities';

const S = {};

S.RightSide = styled(Box)`
  z-index: 999;
  @media ${device.phone} {
      display: none;
  }
  @media ${device.tabletSM} {
    background-color: ${({ theme }) => theme.darkColor};
    box-shadow: ${({ theme }) => theme.boxShadowLeft};
    color: #AEAEAA;
    display: flex;
    grid-area: ${props => props.gridArea};
    overflow: visible;
    padding: ${({ theme }) => theme.p(2)};
    padding-top: ${({ theme }) => theme.p(2.8)};
  }
`;

function RightSide({ children, gridArea }) {
  return (
    <S.RightSide gridArea={gridArea}>
      {children}
    </S.RightSide>
  );
}

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

export default React.memo(RightSide);
