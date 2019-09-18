// DO NOT USE MOMENT FOR YOUR TIME CALCULATIONS
// THESE GUYS PROVIDE LOTS OF USEFUL FUNCTIONS
// https://material-ui-pickers.dev/guides/formats
import React, { useEffect, useState } from 'react';
import AccessTime from '@material-ui/icons/AccessTime';
import PropTypes from 'prop-types';
import moment from 'moment';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import {
  isMobile,
  isDesktop,
} from 'utilities';
import {
  KeyboardTimePicker,
  TimePicker,
} from '@material-ui/pickers';


const EntryFormTimePicker = (props) => {
  const {
    selectedTime,
    selectedDate,
    handleTimeChange,
  } = props;

  const [helperText, setHelperText] = useState('');
  const [isError, setErrorStatus] = useState(false);

  useEffect(() => {
    const now = moment();
    const selectedDateIsToday = moment(selectedDate).isSame(new Date(), 'day');
    const selectedTimeIsEarlier = moment(selectedTime).isBefore(now, 'minute');
    if (selectedDateIsToday && selectedTimeIsEarlier) {
      setErrorStatus(true);
      setHelperText('Selected time is in the past.');
    } else {
      setErrorStatus(false);
      setHelperText('');
    }
  }, [selectedDate, selectedTime, helperText]);

  const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: blueGrey,
    },
  });

  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        {isMobile
          && (
            <TimePicker
              ampm
              mask='__:__ _M'
              error={isError}
              helperText={helperText}
              minDate={new Date()}
              label='Release Time:'
              value={selectedTime}
              onChange={handleTimeChange}
            />
          )}
        {isDesktop
          && (
            <KeyboardTimePicker
              ampm
              error={isError}
              mask='__:__ _M'
              helperText={helperText}
              label='Release Time:'
              value={selectedTime}
              onChange={handleTimeChange}
              InputAdornmentProps={{ position: 'start' }}
              keyboardIcon={<AccessTime />}
            />
          )}
      </ThemeProvider>
    </>
  );
};

EntryFormTimePicker.defaultProps = {
  selectedTime: new Date(),
  selectedDate: new Date(),
};

EntryFormTimePicker.propTypes = {
  handleTimeChange: PropTypes.func.isRequired,
  selectedTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};

export default React.memo(EntryFormTimePicker);
