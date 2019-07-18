import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  RenderIfMobile,
  RenderIfDesktop,
} from 'utilities';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

const EntryFormDatePicker = (props) => {
  const { selectedDate, handleDateChange } = props;
  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        <RenderIfMobile>
          <DatePicker
            autoOk
            disablePast
            format='MMMM DD, YYYY'
            label='Release Date:'
            value={selectedDate}
            onChange={handleDateChange}
          />
        </RenderIfMobile>
        <RenderIfDesktop>
          <KeyboardDatePicker
            autoOk
            disablePast
            format='MM/DD/YYYY'
            label='Release Date:'
            value={selectedDate}
            KeyboardButtonProps={{ margin: 'none' }}
            InputAdornmentProps={{ position: 'start' }}
            onChange={handleDateChange}
          />
        </RenderIfDesktop>
      </ThemeProvider>
      </>
  );
};

EntryFormDatePicker.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    // PropTypes.instanceOf(Moment),
  ]).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default EntryFormDatePicker;
