// DO NOT USE MOMENT FOR YOUR TIME CALCULATIONS
// THESE GUYS PROVIDE LOTS OF USEFUL FUNCTIONS
// https://material-ui-pickers.dev/guides/formats
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import {
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  isMobile,
  isDesktop,
} from 'utilities';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

function EntryFormDatePicker({ selectedDate, handleDateChange }) {
  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        {isMobile
          && (
            <DatePicker
              autoOk
              disablePast
              format='MM/DD/YYYY'
              label='Release Date:'
              minDateMessage='Selected date is in the past'
              value={selectedDate}
              onChange={handleDateChange}
            />
          )}
        {isDesktop
          && (
            <KeyboardDatePicker
              autoOk
              disablePast
              format='MM/DD/YYYY'
              label='Release Date:'
              value={selectedDate}
              minDateMessage='Selected date is in the past'
              KeyboardButtonProps={{ margin: 'none' }}
              InputAdornmentProps={{ position: 'start' }}
              onChange={handleDateChange}
            />
          )}
      </ThemeProvider>
    </>
  );
}

EntryFormDatePicker.defaultProps = {
  selectedDate: new Date(),
};

EntryFormDatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]),
};

export default React.memo(EntryFormDatePicker);
