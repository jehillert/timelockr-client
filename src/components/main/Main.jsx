/* eslint-disable react/jsx-indent */
import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  EntryFormDialogButton,
  EntryFormDialog,
  Box,
  CardAreaTabs,
  LeftSide,
  MainMenu,
  RightSide,
} from 'components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const debug = Debug('src:components:app:main');

const S = {};

S.AppBar = styled.div`
  background-color: ${props => props.theme.headerFooterColor};
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

S.FabBox = styled.div`
  @media (min-width: 51rem) {
    display: none;
  }
`;

S.CardArea = styled.div`
  grid-area: ${props => props.gridArea};
`;

S.Fab = styled(Fab)`
  position: fixed;
  bottom: 50px;
  left: 50%;
  margin-left: 16.5rem;
`;

S.Middle = styled(Box)`
  grid-column: 2;
  width: 44rem;
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
          <S.AppBar gridArea='appBar'>
            <S.AppBarContainer>
              <MainMenu
                revokeAuth={revokeAuth}
                username={username}
              />
            </S.AppBarContainer>
          </S.AppBar>
          <S.CardArea gridArea='cardArea'>
            <CardAreaTabs
              id='card-area-tabs'
              entries={entries}
              refresh={refresh}
            />
            <S.FabBox>
              <S.Fab
                size='medium'
                color='secondary'
              >
                <AddIcon />
              </S.Fab>
            </S.FabBox>
          </S.CardArea>
        </S.Middle>
      <RightSide gridArea='rightSide'>
        <S.EntryFormDialogButton {...props} />
      </RightSide>
    </Box>
  );
};

S.AppBar.propTypes = {
  gridArea: PropTypes.string.isRequired,
};

S.CardArea.propTypes = {
  gridArea: PropTypes.string.isRequired,
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
