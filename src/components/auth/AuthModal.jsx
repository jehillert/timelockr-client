/* eslint-disable react/forbid-prop-types */
import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { AuthTabs, Box } from 'components';

const debug = Debug('src:components:auth-modal');
const S = {};

S.ModalContentContainer = styled.div`
  //ALL DEVICES
  background-color: ${props => props.theme.lightColor};
  box-shadow: ${props => props.theme.boxShadow};

  //DESKTOPS & TABLETS
  @media (min-width: ${props => props.theme.abp1}) {
    margin: auto;
    margin-top: 4rem;
    width: ${props => props.theme.modalWidth};
  }
  @media (max-width: ${props => props.theme.abp1}) {
    margin: auto;
    margin-top: 4rem;
    width: ${props => props.theme.modalWidth};
  }

  //MOBILE
  @media (max-width: ${props => props.theme.abp1}) and (hover: none) and (pointer: coarse) {
    margin: 0;
    width: 100vw;
    height: 100vh;
  }

`;

S.AuthHeading = styled.div`
  //ALL DEVICES
  box-shadow: ${props => props.theme.insetBoxShadowBottom};
  padding: ${props => props.theme.p(3)};
  padding-top: ${props => props.theme.p(5)};

  //MOBILE
  @media (max-width: ${props => props.theme.abp1}) and (hover: none) and (pointer: coarse) {
    padding-top: ${props => props.theme.p(7)};
    padding-bottom: ${props => props.theme.p(3)};
  }
`;

class AuthModal extends React.Component {
  constructor(props) {
    debug('[AuthModal] rendered');
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
      <S.ModalContentContainer>
        <S.AuthHeading>
          <h1>{title}</h1>
        </S.AuthHeading>
        <AuthTabs
          handleSignin={handleSignin}
          handleAddUser={handleAddUser}
          hasAuth={hasAuth}
          setTitle={this.setTitle}
        />
      </S.ModalContentContainer>
      </Modal>
    );
  }
}

AuthModal.propTypes = {
  handleAddUser: PropTypes.func.isRequired,
  handleSignin: PropTypes.func.isRequired,
  hasAuth: PropTypes.bool.isRequired,
};

export default AuthModal;
