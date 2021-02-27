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
  border-radius: ${({ theme }) => theme.dialogRadius};
`;

const StyledMuiDialogTitle = styled(DialogTitle)`
  font-size: ${({ theme }) => theme.fontSizeDialogTitle};
  padding-top: ${({ theme }) => theme.p(3)};
  padding-bottom: ${({ theme }) => theme.p(3)};
  color: ${({ theme }) => theme.fgColor1};
  background: ${({ theme }) => theme.primary};
`;

const StyledMuiDialogContent = styled(DialogContent)`
  padding: ${({ theme }) => theme.p(3)};
  padding-top: ${({ theme }) => theme.p(3)};
  padding-bottom: ${({ theme }) => theme.p(3)};
`;

const StyledMuiTextFieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const StyledMuiTextField = styled(TextField)`
  margin: ${({ theme }) => theme.m(0.5)};
`;

const StyledMuiDateFieldContainer = styled(Box)`
  display: flex;
  flex: nowrap;
  padding-top: ${({ theme }) => theme.p(3)};
  justify-content: center;
  * {
    margin: ${({ theme }) => theme.m(0.5)};
  }
`;

const StyledMuiDialogActions = styled(DialogActions)`
  padding: ${({ theme }) => theme.p(3)};
  padding-top: ${({ theme }) => theme.p(2)};
  padding-bottom: ${({ theme }) => theme.p(2)};
  background: ${({ theme }) => theme.primary};
`;

export {
  StyledMuiDialog,
  StyledMuiDialogTitle,
  StyledMuiDialogContent,
  StyledMuiTextFieldContainer,
  StyledMuiTextField,
  StyledMuiDateFieldContainer,
  StyledMuiDialogActions,
};
