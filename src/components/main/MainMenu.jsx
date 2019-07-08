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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const [dialogHasConfirmed, setConfirm] = useState(false);
  const [shouldRenderConfirmDialog, setShouldRenderConfirmDialog] = useState(false);

  useEffect(() => {
    debug(`
      open:     ${open}
      entryId:  ${username}
      selected: ${selected}
    `);

    if (selected === 'delete') {
      setShouldRenderConfirmDialog(true);
    }

    if (selected === 'logout') {
      revokeAuth();
    }

    return () => {
      setOpen(false);
      setAnchorEl(null);
      setSelected('');
    };
  }, [open, username, selected, revokeAuth]);

  useEffect(() => {
    if (dialogHasConfirmed) {
      deleteUser(username);
    }

    return () => {
      setOpen(false);
      setAnchorEl(null);
      setSelected('');
    };
  });

  const handleMenuButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleConfirmDialog = (isConfirmed) => {
    setConfirm(isConfirmed);
    setShouldRenderConfirmDialog(false);
  };

    return (
      <>
        {shouldRenderConfirmDialog
          && (
            <ConfirmDialog
              handleConfirmDialog={handleConfirmDialog}
              open={shouldRenderConfirmDialog}
              variant='deleteAccount'
            />
          )
        }
        <S.IconButton
          aria-label='More'
          aria-owns={open ? 'main-menu' : undefined}
          aria-haspopup='true'
          className='s-icon-button'
          onClick={handleMenuButtonClick}
        >
          <MoreVertIcon />
        </S.IconButton>
        {open
          && (
            <ClickAwayListener onClickAway={() => setSelected('noSelection')}>
              <Paper>
                <ErrorBoundary>
                  <Menu
                    id='main-menu'
                    anchorEl={anchorEl}
                    open={open}
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
                </ErrorBoundary>
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
