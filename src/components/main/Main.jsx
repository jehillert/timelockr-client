import * as Debug from 'debug';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import styled from 'styled-components';
import { device } from 'utilities';
import {
  EntryFormDialog,
  Box,
  CardAreaTabs,
  LeftSide,
  MainMenu,
  RightSide,
} from 'components';

const debug = Debug('src:components:app:main');

const S = {};

S.AppBar = styled.div`
  background-color: ${props => props.theme.primary};
  justify-items: flex-end;
  height: 3rem;
  box-shadow: ${props => props.theme.boxShadow};
  grid-area: ${props => props.gridArea};
  max-width: ${props => props.cardAreaWidth};

  /* TOO SMALL FOR MARGINS */
  @media (max-width: ${props => props.theme.bp[4]}){
    width: 100vw;
    margin-right: none;
    margin-left: none;
  }

  /* LARGE ENOUGH FOR MARGINS */
  @media (min-width: ${props => props.theme.bp[3]}) {
    margin-left: ${props => props.theme.p(3)};
    margin-right: ${props => props.theme.p(3)};
  }
`;

S.AppBarContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  padding: 0 0.25rem 0 1rem;
`;

S.InsideFabBox = styled.div`
  @media ${device.phone} {
    display: flex;
  }
  @media ${device.desktopSM} {
    display: none;
  }
`;

S.OutsideFabBox = styled.div`
  @media ${device.phone} {
    display: none;
  }
  @media ${device.desktopSM} {
    display: flex;
  }
`;

S.CardArea = styled.div`
  grid-area: ${props => props.gridArea};
  /* TOO SMALL FOR MARGINS */
  @media (max-width: ${props => props.theme.bp[4]}){
    padding-right: none;
    padding-left: none;
  }
  /* LARGE ENOUGH FOR MARGINS */
  @media (min-width: ${props => props.theme.bp[4]}) {
    padding-left: ${props => props.theme.p(3)};
    padding-right: ${props => props.theme.p(3)};
  }
`;

S.OutsideFab = styled(Fab)`
  background-color: ${props => props.theme.accentColor};
  color: ${props => props.theme.lightColor};
  :hover {
    background-color: ${props => props.theme.hoverColor};
  }
`;

S.InsideFab = styled(S.OutsideFab)`
  position: fixed;
  bottom: 50px;
  /* TOO SMALL FOR MARGINS */
  @media (max-width: ${props => props.theme.bp[4]}){
    right: ${props => props.theme.m(4)}
  }
  /* LARGE ENOUGH FOR MARGINS */
  @media (min-width: ${props => props.theme.bp[4]}) {
    left: 50%;
    margin-left: 16.5rem;
  }
`;

S.Middle = styled(Box)`
  grid-column: 2;
  width: 44rem;
`;

function Main(props) {
  debug('[Main] rendered');

  const {
    entries,
    refresh,
    revokeAuth,
    userId,
    username,
  } = props;

  const [dialogShouldRender, setDialogState] = useState(false);

  // Clicking FAB opens 'EntryFormDialog'
  const handleClick = () => setDialogState(true);

  // Callback for closing 'EntryFormDialog'
  const closeDialog = () => setDialogState(false);

  const OutsideFab = (
    <S.OutsideFab
      aria-label='Add'
      size='medium'
      onClick={handleClick}
    >
      <AddIcon />
    </S.OutsideFab>
  );

  const InsideFab = (
    <S.InsideFab
      aria-label='Add'
      color='secondary'
      size='medium'
      onClick={handleClick}
    >
      <AddIcon />
    </S.InsideFab>
  );

  debug('LOCKED.jsx:\n%O', entries.locked);
  debug('RELEASED:\n%O', entries.released);

  return (
    <>
      {dialogShouldRender && (
        <EntryFormDialog
          closeDialog={closeDialog}
          refresh={refresh}
          userId={userId}
          username={username}
        />
      )}
      <Box id='primary-container'>
        <LeftSide gridArea='leftSide' title='TimeLockr' />
        <S.Middle>
          <S.AppBar gridArea='appBarArea'>
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
            <S.InsideFabBox>
              {InsideFab}
            </S.InsideFabBox>
          </S.CardArea>
        </S.Middle>
        <RightSide gridArea='rightSide'>
          <S.OutsideFabBox>
            {OutsideFab}
          </S.OutsideFabBox>
        </RightSide>
      </Box>
    </>
  );
}

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
  revokeAuth: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default React.memo(Main);
