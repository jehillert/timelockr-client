/* eslint-disable react/jsx-indent */
import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  EntryFormDialogButton,
  Box,
  CardAreaTabs,
  LeftSide,
  MainMenu,
  RightSide,
} from 'components';
import { ErrorBoundary } from 'utilities';

const debug = Debug('src:components:app:main');

const S = {};

S.Middle = styled(Box)`
  grid-column: 2;
  width: 44rem;
`;

S.AppBar = styled.div`
  background-color: #A18664;
  justify-items: flex-end;
  height: 3rem;
  box-shadow: ${props => props.theme.boxShadow};
  grid-area: ${props => props.gridArea};
  width: ${props => props.cardAreaWidth};
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

S.AppBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 0 0.25rem 0 1rem;
`;

S.EntryFormDialogButton = styled(props => <EntryFormDialogButton {...props} />)`
  display: grid;
  margin-top: 1rem;
`;

const Main = (props) => {
  const {
    entries,
    hasAuth,
    refresh,
    revokeAuth,
    username,
  } = props;

  debug('LOCKED.jsx:\n%O', entries.locked);
  debug('RELEASED:\n%O', entries.released);

  return (
    <Box className='grid-desktop'>
      <LeftSide gridArea='leftSide' title='TimeLockr' />
        <S.Middle>
          <ErrorBoundary>
            <S.AppBar gridArea='appBar'>
              <S.AppBarContainer>
                <MainMenu
                  revokeAuth={revokeAuth}
                  username={username}
                />
              </S.AppBarContainer>
            </S.AppBar>
          </ErrorBoundary>
          <ErrorBoundary>
            <CardAreaTabs
              id='card-area-tabs'
              gridArea='cardArea'
              entries={entries}
              refresh={refresh}
            />
          </ErrorBoundary>
        </S.Middle>
      <RightSide gridArea='rightSide'>
          <S.EntryFormDialogButton {...props} />
      </RightSide>
    </Box>
  );
};

Main.defaultProps = {
  entries: {},
};

Main.propTypes = {
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }),
  hasAuth: PropTypes.bool.isRequired,
  revokeAuth: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default Main;
