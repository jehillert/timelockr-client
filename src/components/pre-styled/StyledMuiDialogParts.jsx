import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Box } from 'components';

const StyledMuiDialog = styled(Dialog)`
  display: flex;
  justify-content: center;
  border-radius: ${props => props.theme.dialogRadius};
  width=${props => props.theme.dialogWidth};
`;

const StyledMuiDialogTitle = styled(DialogTitle)`
  font-size: ${props => props.theme.fontSizeDialogTitle};
  padding-top: ${props => props.theme.p(3)};
  padding-bottom: ${props => props.theme.p(3)};
  color: ${props => props.theme.fgColor1};
  background: ${props => props.theme.primary};
`;

const StyledMuiDialogContent = styled(DialogContent)`
  padding: ${props => props.theme.p(3)};
  padding-top: ${props => props.theme.p(3)};
  padding-bottom: ${props => props.theme.p(3)};
`;

const StyledMuiTextFieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const StyledMuiTextField = styled(TextField)`
  margin: ${props => props.theme.m(0.5)};
`;

const StyledMuiDateFieldContainer = styled(Box)`
  display: flex;
  flex: nowrap;
  padding-top: ${props => props.theme.p(3)};
  justify-content: center;
  * {
    margin: ${props => props.theme.m(0.5)};
  }
`;

const StyledMuiDialogActions = styled(DialogActions)`
  padding: ${props => props.theme.p(3)};
  padding-top: ${props => props.theme.p(2)};
  padding-bottom: ${props => props.theme.p(2)};
  background: ${props => props.theme.primary};
`;

export {
  StyledMuiDialog,
  StyledMuiDialogTitle,
  StyledMuiDialogContent,
  StyledMuiTextFieldContainer,
  StyledMuiTextField,
  StyledMuiDateFieldContainer,
  StyledMuiDialogActions,
}
