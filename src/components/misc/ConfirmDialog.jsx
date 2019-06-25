// eslint-disable-next-line no-unused-vars
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Delete entry?
// Entry will be permanently deleted before release date.
// Cancel Confirm

// Delete entry?
// Entry will be permanently deleted.
// Cancel Confirm

// `Extend Release Date?`
// `Information contained in this entry will not be released until ${props.newReleaseDate}`
// Cancel Confirm

class ConfirmDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => (
    this.setState({ open: true })
  )

  handleClose = () => (
    this.setState({ open: false })
  )

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant='outlined' color='primary' onClick={this.handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Disagree
            </Button>
            <Button onClick={this.handleClose} color='primary' autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ConfirmDialog;
