/* eslint-disable no-alert */
/* eslint-disable no-func-assign */
import * as Debug from 'debug';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import {
  FormButton,
  IncrementInput,
  StyledMuiDialog,
  StyledMuiDialogTitle,
  StyledMuiDialogContent,
  StyledMuiDialogActions,
} from 'components';
import { extendReleaseDate, isPhone } from 'utilities';

const debug = Debug('src:components:time-extension-dialog');

const S = {};

S.Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

function TimeExtensionDialog(props) {
  debug('[TimeExtensionDialog] rendered');

  const [open, setOpen] = useState(true);
  const [duration, setDurationValue] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const {
    entryId,
    unmount,
    refresh,
    releaseDate,
  } = props;

  // get changes in child components
  const getChange = (units, value) => {
    debug(`${units}: ${value}`);
    setDurationValue({
      ...duration,
      [units]: value,
    });
  };

  // calculate and submit new release date
  const handleSubmit = (event) => {
    event.preventDefault();

    const mDuration = moment.duration(duration);
    const newReleaseDate = moment(releaseDate).add(mDuration);

    debug(`releaseDate:       %c${moment(releaseDate).format('YYYY-MM-DD HH:mm')}`, 'color:orange; background-color:black');
    debug(`newReleaseDate:    %c${newReleaseDate.format('YYYY-MM-DD HH:mm')}`, 'color:orange; background-color:black');

    return extendReleaseDate(entryId, `${newReleaseDate.utc().format('YYYY-MM-DD HH:mm').toString()}-00`)
      .then(() => setOpen(false))
      .then(() => refresh());
  };

  // set up array of child components
  const timeUnits = Object.keys(duration);
  const arrayOfInputs = timeUnits.map(unit => (
    <IncrementInput
      handleChange={getChange}
      key={unit}
      units={unit}
    />
  ));

      // fullScreen={window.matchMedia('(hover: none) and (pointer: coarse)').matches}
  return (
    <StyledMuiDialog
      aria-labelledby='extend-dialog-title'
      fullScreen={isPhone}
      open={open}
      onClose={() => setOpen(false)}
      onExited={unmount}
    >
      <StyledMuiDialogTitle id='form-dialog-title'>
        Extend Time
      </StyledMuiDialogTitle>
      <StyledMuiDialogContent>
        <S.Form noValidate autoComplete='off'>
          {arrayOfInputs}
        </S.Form>
      </StyledMuiDialogContent>
      <StyledMuiDialogActions>
        <FormButton
          type='button'
          handleSubmit={() => setOpen(false)}
          color='primary'
        >
          Cancel
        </FormButton>
        <FormButton
          type='submit'
          handleSubmit={handleSubmit}
          color='primary'
        >
          Extend
        </FormButton>
      </StyledMuiDialogActions>
    </StyledMuiDialog>
  );
}

TimeExtensionDialog.propTypes = {
  unmount: PropTypes.func.isRequired,
  entryId: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default TimeExtensionDialog;
