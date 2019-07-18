import * as Debug from 'debug';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import Zoom from '@material-ui/core/Zoom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorBoundary, deleteUser, logout } from 'utilities';
import { ConfirmDialog } from 'components';

const debug = Debug('src:components:main-menu');

const S = {};

S.IconButton = styled(IconButton)`
  padding: 11px 5px 11px 5px;
`;

S.MoreVertIcon = styled(MoreVertIcon)`
  color: ${props => props.theme.lightColor}
`;

const MainMenu = (props) => {
  const { revokeAuth, username } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuShouldRender, setMenuState] = useState(false);
  const [selected, setSelected] = useState('');
  const [dialogShouldRender, setDialogState] = useState(false);

  useEffect(() => {
    debug(`selected: ${selected}`);

    if (selected === 'delete') {
      setDialogState(val => !val);
    }

    if (selected === 'logout') {
      logout().then(() => revokeAuth());
    }

    return () => {
      setMenuState(false);
      setAnchorEl(null);
      setSelected('');
    };
  }, [selected, revokeAuth]);

  const handleMenuButtonClick = (event) => {
    debug(`
      event: ${event.currentTarget}
      menuShouldRender: ${menuShouldRender}
    `);
    setAnchorEl(event.currentTarget);
    setMenuState(true);
  };

  const confirmDialog = (isConfirmed) => {
    setDialogState(false);
    if (isConfirmed) {
      deleteUser(username);
    }
  };

  return (
    <>
      {dialogShouldRender
        && (
          <ConfirmDialog
            confirmDialog={confirmDialog}
            open={dialogShouldRender}
            variant='deleteAccount'
          />
        )
      }
      <S.IconButton
        aria-label='More'
        aria-owns={menuShouldRender ? 'main-menu' : undefined}
        aria-haspopup='true'
        className='s-icon-button'
        onClick={handleMenuButtonClick}
      >
        <S.MoreVertIcon />
      </S.IconButton>
      {menuShouldRender
        && (
          <Paper>
            <Menu
              id='main-menu'
              anchorEl={anchorEl}
              open={menuShouldRender}
              onClose={() => setSelected('exitActionSelected')}
              TransitionComponent={Zoom}
            >
              <ErrorBoundary>
                <MenuItem data-value='delete' dense onClick={() => setSelected('delete')}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary='Delete Account' />
                </MenuItem>
              </ErrorBoundary>
              <ErrorBoundary>
                <MenuItem data-value='logout' dense onClick={() => setSelected('logout')}>
                  <ListItemIcon>
                    <MeetingRoomIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </MenuItem>
              </ErrorBoundary>
              <ErrorBoundary>
                <MenuItem data-value='close' dense onClick={() => setSelected('noSelection')}>
                  <ListItemIcon>
                    <CloseIcon />
                  </ListItemIcon>
                  <ListItemText primary='Exit' />
                </MenuItem>
              </ErrorBoundary>
            </Menu>
          </Paper>
      )}
    </>
  );
};

MainMenu.propTypes = {
  revokeAuth: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default MainMenu;
