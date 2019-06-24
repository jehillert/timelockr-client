/* eslint-disable react/jsx-indent */
/* eslint-disable react/forbid-prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Box } from 'components';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

function ClipboardPopover(props) {
  const [open, setOpen] = useState(false);
  const { anchorEl, classes, trigger } = props;

  useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen((false));
    }, 600);
  }, [trigger]);

  return (
    <Box>
      <Popover
        id='clipboard-popover'
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>Copied!</Typography>
      </Popover>
    </Box>
  );
}

ClipboardPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  trigger: PropTypes.bool.isRequired,
  anchorEl: PropTypes.instanceOf(Element).isRequired,
};

export default withStyles(styles)(ClipboardPopover);
