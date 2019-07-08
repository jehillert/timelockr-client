import * as Debug from 'debug';
import React, { useEffect, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorBoundary, deleteUser } from 'utilities';
import { ConfirmDialog } from 'components';

const debug = Debug('src:components:main-menu');

const S = {};

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 11px 5px 11px 5px;
  }
`;

const MainMenu = (props) => {
  const { revokeAuth, username } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMenu, setMenuState] = useState(false);
  const [selected, setSelected] = useState('');
  const [isConfirmed, setConfirm] = useState(false);
  const [isDialog, setDialogState] = useState(false);

  useEffect(() => {
    debug(`selected: ${selected}`);

    if (selected === 'delete') {
      setDialogState(val => !val);
    }

    if (selected === 'logout') {
      debug('logging out');
      revokeAuth();
    }

    return () => {
      setMenuState(false);
      setAnchorEl(null);
      setSelected('');
    };
  }, [selected, revokeAuth]);

  // useEffect(() => {
  //   if (isConfirmed) {
  //     deleteUser(username);
  //   }
  // }, [isDialog]);

  const handleMenuButtonClick = (event) => {
    debug(`
      event:     ${event.currentTarget}
      isMenu: ${isMenu}
    `);
    setAnchorEl(event.currentTarget);
    setMenuState(true);
  };

  // const handleConfirmDialog = (isConfirmed) => {
  //   setConfirm(isConfirmed);
  //   if (isConfirmed) {
  //     deleteUser(username);
  //   }
  // };

  const confirmDialog = (isConfirmed) => {
    setDialogState(false);
    if (isConfirmed) {
      deleteUser(username);
    }
  }

    return (
      <>
        {isDialog
          && (
            <ConfirmDialog
              confirmDialog={confirmDialog}
              open={isDialog}
              variant='deleteAccount'
            />
          )
        }
        <S.IconButton
          aria-label='More'
          aria-owns={isMenu ? 'main-menu' : undefined}
          aria-haspopup='true'
          className='s-icon-button'
          onClick={handleMenuButtonClick}
        >
          <MoreVertIcon />
        </S.IconButton>
        {isMenu
          && (
            <ClickAwayListener onClickAway={() => setSelected('noSelection')}>
              <Paper>
                <Menu
                  id='main-menu'
                  anchorEl={anchorEl}
                  open={isMenu}
                >
                  <ErrorBoundary>
                    <MenuItem data-value='delete' onClick={() => setSelected('delete')}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText inset primary='Delete Account' />
                    </MenuItem>
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <MenuItem data-value='logout' onClick={() => setSelected('logout')}>
                      <ListItemIcon>
                        <MeetingRoomIcon />
                      </ListItemIcon>
                      <ListItemText inset primary='Logout' />
                    </MenuItem>
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <MenuItem data-value='close' onClick={() => setSelected('noSelection')}>
                      <ListItemIcon>
                        <CloseIcon />
                      </ListItemIcon>
                      <ListItemText inset primary='Exit' />
                    </MenuItem>
                  </ErrorBoundary>
                </Menu>
              </Paper>
            </ClickAwayListener>
        )}
      </>
  );
};

MainMenu.propTypes = {
  revokeAuth: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default MainMenu;
