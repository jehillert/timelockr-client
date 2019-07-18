import React from 'react';
import { KeyboardTimePicker, TimePicker } from '@material-ui/pickers';
import AccessTime from '@material-ui/icons/AccessTime';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'moment';

/*
! prevent negative time
*/

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

S.TimePicker = styled(TimePicker)`

`;

S.KeyboardTimePicker = styled(KeyboardTimePicker)`

`;

const EntryFormTimePicker = (props) => {
  const { selectedTime, handleTimeChange } = props;
  return (
    <>
      <S.MobilePickerContainer>
        <S.TimePicker
          clearable={true}
          ampm={false}
          label='Release Time'
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </S.MobilePickerContainer>
      <S.DesktopPickerContainer>
        <S.KeyboardTimePicker
          ampm
          clearable={true}
          keyboardIcon={<AccessTime />}
          label='Release Time'
          inputVariant='outlined'
          InputAdornmentProps={{ position: 'start' }}
          onChange={handleTimeChange}
          value={selectedTime}
        />
      </S.DesktopPickerContainer>
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
