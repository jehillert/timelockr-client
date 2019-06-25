import React from 'react';
import { InlineDatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types';
import Moment from 'moment';

const DatePicker = (props) => {
  const { selectedDate, handleDateChange } = props;
  return (
    <InlineDatePicker
      keyboard
      disablePast
      variant='outlined'
      label='Release Date'
      format='MM/DD/YYYY'
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
};


DatePicker.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(Moment),
  ]).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default DatePicker;
