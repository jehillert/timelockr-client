/* eslint-disable default-case */
import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormButton } from 'components';

const debug = Debug('src:components:confirm-dialog');

function ConfirmDialog(props) {
  debug('[ConfirmDialog] rendered');

  const {
    buttonLabel,
    confirmDialog,
    message,
    open,
    title,
    variant,
   } = props;

  let ttl;
  let msg;
  let bttnlbl;

  switch (variant) {
    case 'deleteAccount':
      ttl = 'Confirm User Account Deletion';
      msg = 'Are you sure you want to delete your account?  This action will permanently erase all of your data and cannot be undone.';
      bttnlbl = 'Delete';
      break;
    case 'logout':
      ttl = 'Confirm';
      msg = 'Logout from this session?';
      bttnlbl = 'Ok';
      break;
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          {ttl || title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {msg || message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormButton
            type='button'
            handleSubmit={confirmDialog(false)}
            color='primary'
          >
            Cancel
          </FormButton>
          <FormButton
            type='submit'
            handleSubmit={confirmDialog(true)}
            color='primary'
          >
            {bttnlbl || buttonLabel}
          </FormButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmDialog.defaultProps = {
  variant: null,
  buttonLabel: 'Ok',
  message: 'Do you wish to proceed?',
  title: 'Confirm',
};

ConfirmDialog.propTypes = {
  buttonLabel: PropTypes.string,
  confirmDialog: PropTypes.func.isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  variant: PropTypes.string,
};

export default React.memo(ConfirmDialog);
