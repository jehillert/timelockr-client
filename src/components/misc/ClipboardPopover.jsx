import React, { useEffect } from 'react';
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
  const { anchorEl, classes } = props;
  const open = Boolean(anchorEl);

  const intervalStopper = setInterval(() => console.log('I am still here', 600));

  useEffect(() => {
    return () => clearInterval(intervalStopper);
  }, []);

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

ClipboardPopover.Defaultprops = {
  anchorEl: null,
}

ClipboardPopover.propTypes = {
  anchorEl: PropTypes.instanceOf(Element),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClipboardPopover);
