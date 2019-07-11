import * as Debug from 'debug';
import chalk from 'chalk';
import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import styled from 'styled-components';
import { createEntry } from 'utilities';
import {
  Box,
  DatePicker,
  FormButton,
  TimePicker,
} from 'components';
import { withStyles } from '@material-ui/core/styles';

const bgOrange = chalk.hex('#000000').bgHex('#38A53C');
const debug = Debug('src:components:entry-form-dialog');

const S = {};

S.Dialog = styled(Dialog)`
  &.s-dialog {
    display: flex;
    flex-direction: row;
    margin: 0;
    margin-top: 4rem;
    align-self: flex-end;
    justify-content: center;
    border-radius: ${props => props.theme.dialogRadius};
  }
`;

S.DialogTitle = styled(DialogTitle)`
  color: ${props => props.theme.secondaryColor};
  background: ${props => props.theme.headerFooterColor};
`;

S.DialogContent = styled(DialogContent)``;

S.DialogActions = styled(DialogActions)`
  color: ${props => props.theme.secondaryColor};
  background: ${props => props.theme.headerFooterColor};
`;

S.TextField = styled(TextField)`
`;

// S.DatePicker = styled(DatePicker)`
//   width: 2rem;
// `;

// S.TimePicker = styled(TimePicker)`
//   width: 2rem;
// `;

S.TimeBox = styled(Box)`
  display: flex;
  flex: nowrap;
  justify-content: space-between;
  & .s-time-picker {
    margin: .75rem;
    width: 2rem;
  }
`;

const styles = theme => ({
  dense: {
    marginTop: 16,
  },
  fab: {
    margin: theme.spacing(),
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
});

class EntryFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      content: '',
      selectedDate: new Date(),
      selectedTime: new Date(),
      open: false,
    };
  }

  handleChange = e => (
    this.setState({ [e.target.id]: e.target.value })
  )

  handleClickOpen = () => {
    this.setState({
      description: '',
      content: '',
      selectedDate: new Date(),
      selectedTime: new Date(),
    });

    this.setState({ open: true });
  }

  handleClose = () => (
    this.setState({ open: false })
  )

  handleDateChange = date => (
    this.setState({ selectedDate: date })
  )

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      content,
      description,
      selectedDate,
      selectedTime,
    } = this.state;

    const {
      refresh,
      userId,
    } = this.props;

    const creationDate = moment().format('YYYY-MM-DD HH:mm');
    const formattedTime = moment(selectedTime).utc().format('HH:mm').toString();
    const formattedDate = moment(selectedDate).utc().format('YYYY-MM-DD').toString();
    const releaseDate = `${formattedDate} ${formattedTime}-00`;

    debug(
      bgOrange(formattedTime),
      bgOrange(formattedDate),
      bgOrange(releaseDate),
    );

    const newEntry = {
      userId,
      creationDate,
      releaseDate,
      description,
      content,
    };

    return createEntry(newEntry)
      .then(() => refresh())
      .then(this.handleClose);
  }

  handleTimeChange = time => this.setState({ selectedTime: time });

  render() {
    const { classes } = this.props;
    const {
      content,
      description,
      open,
      selectedDate,
      selectedTime,
    } = this.state;
    return (
      <>
        <Fab
          onClick={this.handleClickOpen}
          size='small'
          color='primary'
          aria-label='New Entry'
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
        <S.Dialog
          aria-labelledby='form-dialog-title'
          className='s-dialog'
          open={open}
          onClose={this.handleClose}
          width='26rem'
        >
          <S.DialogTitle id='form-dialog-title'>New Entry</S.DialogTitle>
          <S.DialogContent>
            <S.TextField
              id='description'
              autoComplete='off'
              css='margin: 8;'
              fullWidth
              label='Enter a description.'
              margin='dense'
              placeholder='(555) 555-5555'
              variant='outlined'
              className={classNames(classes.dense, classes.textField)}
              onChange={this.handleChange}
              value={description}
            />
            <S.TextField
              id='content'
              autoComplete='off'
              fullWidth
              label='Enter something to lock away.'
              margin='dense'
              multiline
              placeholder={'Ex-girlfriend\'s phone number'}
              rows='4'
              rowsMax='10'
              variant='outlined'
              className={classNames(classes.dense, classes.textField)}
              onChange={this.handleChange}
              value={content}
            />
            <S.TimeBox flexWrap='nowrap'>
              <>
                <DatePicker
                  className='s-time-picker'
                  handleDateChange={this.handleDateChange}
                  selectedDate={selectedDate}
                />
                <TimePicker
                  className='s-time-picker'
                  handleTimeChange={this.handleTimeChange}
                  selectedTime={selectedTime}
                />
              </>
            </S.TimeBox>
          </S.DialogContent>
          <S.DialogActions>
            <FormButton
              type='button'
              handleSubmit={this.handleClose}
              color='primary'
            >
              Cancel
            </FormButton>
            <FormButton
              type='submit'
              handleSubmit={this.handleSubmit}
              color='primary'
            >
              Submit
            </FormButton>
          </S.DialogActions>
        </S.Dialog>
      </>
    );
  }
}

EntryFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default withStyles(styles)(EntryFormDialog);
