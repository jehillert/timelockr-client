/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { AuthTabs, Box } from 'components';

const S = {};

// S.Box = styled(props => <Box {...props} />)`
// `;

S.ModalTitle = styled.h2`
  color: ${props => props.theme.fgColor2};
`;

S.Modal = styled(Modal)`
  @media (min-width: ${props => props.theme.bp3}) {
    width: 100%;
  }
  color: ${props => props.theme.fgColor2};
`;

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '4rem',
    margin: 'auto',
    height: theme.spacing(38),
    width: theme.spacing(45),
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
            <S.ModalTitle>{title}</S.ModalTitle>
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
