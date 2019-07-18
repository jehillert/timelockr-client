import React from 'react';
import AccessTime from '@material-ui/icons/AccessTime';
import PropTypes from 'prop-types';
import Moment from 'moment';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import {
  RenderIfMobile,
  RenderIfDesktop,
} from 'utilities';
import {
  KeyboardTimePicker,
  TimePicker,
} from '@material-ui/pickers';

/*
! prevent negative time
*/

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: blueGrey,
  },
});

const EntryFormTimePicker = (props) => {
  const { selectedTime, handleTimeChange } = props;
  return (
    <>
      <ThemeProvider theme={defaultMaterialTheme}>
        <RenderIfMobile>
          <TimePicker
            ampm
            format="H:MM A"
            label='Release Time:'
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </RenderIfMobile>
        <RenderIfDesktop>
          <KeyboardTimePicker
            ampm
            format="H:MM A"
            label='Release Time:'
            value={selectedTime}
            onChange={handleTimeChange}
            InputAdornmentProps={{ position: 'start' }}
            keyboardIcon={<AccessTime />}
          />
        </RenderIfDesktop>
      </ThemeProvider>
    </>
  );
};

EntryFormTimePicker.propTypes = {
  selectedTime: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(Moment),
  ]).isRequired,
  handleTimeChange: PropTypes.func.isRequired,
};

export default EntryFormTimePicker;

// mask={[/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
