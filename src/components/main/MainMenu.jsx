import React, { Fragment, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import * as Debug from 'debug';
// import chalk from 'chalk';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import styled from 'styled-components';
import Promise from 'bluebird';

const debug = Debug('src:components:main-menu');

const S = {};

S.IconButton = styled(IconButton)`
  .s-icon-button {
    color: ${props => props.theme.secondaryColor};
    margin-top: -5px;
    height: 2.25rem;
    width: 2.25rem
    hover: {
      background-color: red;
    }
  }
`;

S.ListItemIcon = styled(ListItemIcon)`
  &.s-icon-button {
    color: red;
  }
`;

S.MenuItem = styled(MenuItem)`
  &.s-menu-item {
    color: red;
  }
`;

S.ListItemText = styled(ListItemText)`
  &.s-list-item-text {
    color: red;
  }
`;

function MainMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selection, setSelection] = useState('');

  useEffect(() => {
    debug(selection);
  }, [selection]);

  const handleClick = event => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (event) => {
    handleClose();
    setSelection(event.currentTarget.dataset.value);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <>
        <S.IconButton
          aria-owns={anchorEl ? 'main-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MenuIcon fontSize='large' className='s-icon-button' />
        </S.IconButton>
        <Menu
          id='main-menu'
          anchorEl={anchorEl}
          disableAutoFocusItem
          open={Boolean(anchorEl)}
        >
          <S.MenuItem
            className='s-menu-item'
            data-value='account'
            onClick={handleSelect}
          >
            <S.ListItemIcon
              className='s-icon-button'
            >
              <PersonIcon />
            </S.ListItemIcon>
            <S.ListItemText
              className='s-list-item-text'
              inset
              primary='Account'
            />
          </S.MenuItem>
          <S.MenuItem
            className='s-menu-item'
            data-value='logout'
            onClick={handleSelect}
          >
            <S.ListItemIcon
              className='s-icon-button'
            >
              <MeetingRoomIcon />
            </S.ListItemIcon>
            <S.ListItemText
              className='s-list-item-text'
              inset
              primary='Logout'
            />
          </S.MenuItem>
          <S.MenuItem
            className='s-menu-item'
            data-value='settings'
            onClick={handleSelect}
          >
            <S.ListItemIcon
              className='s-icon-button'
            >
              <SettingsIcon />
            </S.ListItemIcon>
            <S.ListItemText
              className='s-list-item-text'
              inset
              primary='Settings'
            />
          </S.MenuItem>
        </Menu>
      </>
    </ClickAwayListener>
  );
}

// MainMenu.propTypes = {
// };

export default MainMenu;
