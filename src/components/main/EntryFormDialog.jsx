// TODO - create defaultState variable to handle duplicate
import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  addEntry,
} from 'actions';
import {
  ErrorBoundary,
  isPhone,
} from 'utilities';
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

class EntryFormDialog extends React.PureComponent {
  static propTypes = {
    addEntry: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    userId: PropTypes.number.isRequired,
  };

  state = {
    description: '',
    content: '',
    open: true,
    selectedDate: new Date(),
    selectedTime: new Date(),
  };

  handleChange = e => (
    this.setState({ [e.target.id]: e.target.value })
  )

  handleClose = () => {
    const { closeDialog } = this.props;
    this.setState(
      {
        description: '',
        content: '',
        open: false,
        selectedDate: new Date(),
        selectedTime: new Date(),
      },
    );
  }

  handleDateChange = date => (
    this.setState({ selectedDate: date })
  )

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      addEntry,
      refresh,
      userId,
    } = this.props;

    const {
      content,
      description,
      selectedDate,
      selectedTime,
    } = this.state;

    debug(`selectedTime: %c${selectedTime}`, 'color:orange; background-color:black');
    debug(`selectedDate: %c${selectedDate}`, 'color:orange; background-color:black');
    const creationDate = moment().format('YYYY-MM-DD HH:mm');

    // Combine hours, minutes, seconds of selectedTime
    // with month, day, year of selectedDate
    const sD = moment(selectedDate);
    const sT = moment(selectedTime);

    const releaseDateLocal = sD.set({
      hour: sT.get('hour'),
      minute: sT.get('minute'),
      second: sT.get('second'),
    });

    // Format releaseDate to UTC string
    const releaseDate = `${releaseDateLocal.utc().format('YYYY-MM-DD HH:mm').toString()}-00`;

    debug(`releaseDate: %c${releaseDate}`, 'color:orange; background-color:black');

    const newEntry = {
      userId,
      creationDate,
      releaseDate,
      description,
      content,
    };

    addEntry(newEntry)
      .then(() => refresh())
      .then(this.handleClose);
    // return createEntry(newEntry)
    //   .then(() => refresh())
    //   .then(this.handleClose);
  }

  handleTimeChange = time => this.setState({ selectedTime: time });

  render() {
    const { closeDialog } = this.props;

    const {
      content,
      description,
      open,
      selectedDate,
      selectedTime,
    } = this.state;

    return (
      <>
        <StyledMuiDialog
          aria-labelledby='form-dialog-title'
          fullScreen={isPhone}
          onExited={() => closeDialog()}
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
                <ErrorBoundary>
                  <S.DatePicker
                    handleDateChange={this.handleDateChange}
                    selectedDate={selectedDate}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <S.TimePicker
                    handleTimeChange={this.handleTimeChange}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                  />
                </ErrorBoundary>
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

// const mapStateToProps = state => ({
//   entry: state.entries.entry,
// });

// export default connect(mapStateToProps, { addEntry })(EntryFormDialog);
export default connect(null, { addEntry })(EntryFormDialog);
