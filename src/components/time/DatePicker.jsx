import React from 'react';
import { DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import CalendarToday from '@material-ui/icons/CalendarToday';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';

const S = {};

S.MobilePickerContainer = styled.div`
  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
`;

S.DesktopPickerContainer = styled.div`
  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;

S.DatePicker = styled(DatePicker)`

`;

S.KeyboardDatePicker = styled(KeyboardDatePicker)`

`;

const EntryFormDatePicker = (props) => {
  const { selectedDate, handleDateChange } = props;
  return (
    <>
      <S.MobilePickerContainer>
        <S.DatePicker
          autoOk
          label="Clearable"
          clearable={true}
          disableFuture
          value={selectedDate}
          onChange={handleDateChange}
        />
      </S.MobilePickerContainer>
      <S.DesktopPickerContainer>
        <S.KeyboardDatePicker
          autoOk
          disablePast
          clearable={true}
          inputVariant='outlined'
          label='Release Date'
          format='MM/DD/YYYY'
          value={selectedDate}
          InputAdornmentProps={{ position: 'start' }}
          onChange={handleDateChange}
        />
      </S.DesktopPickerContainer>
    </>
  );
};
          // keyboardIcon={<CalendarToday />}

EntryFormDatePicker.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    // PropTypes.instanceOf(Moment),
  ]).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default EntryFormDatePicker;
