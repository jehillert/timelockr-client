import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'components';
import styled from 'styled-components';

const S = {};

S.Header = styled(Box)`
  color: '#AEAEAA';
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  grid-column: 2 / span 2;
  div:nth-child(1) {
    flex: 1 1 auto;
  }
`;

const Header = ({ children, level, text }) => {
  return (
    <S.Header
      as={`h${level}`}
      {...props}
    >
      <div title={text}>{text}</div>
      {children}
    </S.Header>
  );
};

Header.defaultProps = {
  children: null,
  level: 'h1',
  mx: 1,
  my: 1,
};

Header.propTypes = {
  children: PropTypes.node,
  level: PropTypes.string,
  mx: PropTypes.number,
  my: PropTypes.number,
  text: PropTypes.string.isRequired,
};

export default React.memo(Header);
