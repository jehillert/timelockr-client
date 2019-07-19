import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import styled from 'styled-components';
import { createEntry } from 'utilities';
import {
  DatePicker,
  FormButton,
  TimePicker,
  StyledMuiDialog,
  StyledMuiDialogTitle,
  StyledMuiDialogContent,
  StyledMuiTextFieldContainer,
  StyledMuiTextField,
  StyledMuiDateFieldContainer,
  StyledMuiDialogActions,
} from 'components';

const debug = Debug('src:components:entry-form-dialog');

const S = {};

S.DatePicker = styled(props => <DatePicker {...props} />)`
  width: auto;
`;

S.TimePicker = styled(props => <TimePicker {...props} />)`
  width: auto;
`;

class EntryFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      content: '',
      selectedDate: new Date(),
      selectedTime: new Date(),
    };
  }

  handleChange = e => (
    this.setState({ [e.target.id]: e.target.value })
  )

  handleClose = () => {
    const { closeDialog } = this.props;
    this.setState(
      {
        description: '',
        content: '',
        selectedDate: new Date(),
        selectedTime: new Date(),
      },
      () => closeDialog(),
    );
  }

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

    /*console.log(
      '%c JavaScript!!',
      'font-weight: bold;
       font-size: 50px;
       color: red;');*/

    debug(`selectedTime: %c${selectedTime}`, 'color:orange; background-color:black');
    debug(`formattedTime: %c${formattedTime}`, 'color:orange; background-color:black');
    debug(`formattedDate: %c${formattedDate}`, 'color:orange; background-color:black');
    debug(`releaseDate: %c${releaseDate}`, 'color:orange; background-color:black');

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
    const { open } = this.props;
    const {
      content,
      description,
      selectedDate,
      selectedTime,
    } = this.state;
    return (
      <>
        <StyledMuiDialog
          aria-labelledby='form-dialog-title'
          open={open}
          onClose={this.handleClose}
        >
          <StyledMuiDialogTitle disableTypography>New Entry</StyledMuiDialogTitle>
          <StyledMuiDialogContent>
            <StyledMuiTextFieldContainer>
              <StyledMuiTextField
                id='description'
                autoComplete='off'
                label='Enter a description.'
                placeholder='(555) 555-5555'
                variant='outlined'
                onChange={this.handleChange}
                value={description}
              />
              <StyledMuiTextField
                id='content'
                autoComplete='off'
                label='Enter something to lock away.'
                multiline
                placeholder={'Ex-girlfriend\'s phone number'}
                rows='4'
                rowsMax='10'
                variant='outlined'
                onChange={this.handleChange}
                value={content}
              />
            </StyledMuiTextFieldContainer>
            <StyledMuiDateFieldContainer>
              <>
                <S.DatePicker
                  handleDateChange={this.handleDateChange}
                  selectedDate={selectedDate}
                />
                <S.TimePicker
                  handleTimeChange={this.handleTimeChange}
                  selectedTime={selectedTime}
                />
              </>
            </StyledMuiDateFieldContainer>
          </StyledMuiDialogContent>
          <StyledMuiDialogActions>
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
          </StyledMuiDialogActions>
        </StyledMuiDialog>
      </>
    );
  }
}

EntryFormDialog.propTypes = {
  closeDialog: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default EntryFormDialog;
