/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { AuthTabs, Box } from 'components';

const styles = theme => ({
  paper: {
    marginTop: '4rem',
    margin: 'auto',
    width: theme.spacing.unit * 60,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
  },
});

class AuthModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'TimeLockr',
      open: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { hasAuth } = this.props;

    if (hasAuth !== prevProps.hasAuth) {
      if (hasAuth) {
        this.handleClose();
      } else {
        this.handleOpen();
      }
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setTitle = newTitle => (
    this.setState({ title: newTitle })
  )

  render() {
    const { open, title } = this.state;
    const {
      classes,
      handleAddUser,
      handleSignin,
      hasAuth,
    } = this.props;

    return (
      <Modal
        aria-labelledby='auth-modal-title'
        aria-describedby='auth-modal-description'
        disableBackdropClick
        open={open}
        onClose={this.handleClose}
      >
        <div className={classes.paper}>
          <Box pl={3} pt={2} pb={1}>
            <h2>{title}</h2>
          </Box>
          <AuthTabs
            handleSignin={handleSignin}
            handleAddUser={handleAddUser}
            hasAuth={hasAuth}
            setTitle={this.setTitle}
          />
        </div>
      </Modal>
    );
  }
}

AuthModal.propTypes = {
  classes: PropTypes.object.isRequired,
  handleAddUser: PropTypes.func.isRequired,
  handleSignin: PropTypes.func.isRequired,
  hasAuth: PropTypes.bool.isRequired,
};

export default withStyles(styles)(AuthModal);
