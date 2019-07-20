/* eslint-disable no-alert */
/* eslint-disable no-func-assign */
import * as Debug from 'debug';
import React, { useState, useEffect } from 'react';
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
import { extendReleaseDate } from 'utilities';

const debug = Debug('src:components:time-extension-dialog');

const S = {};

S.Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

function TimeExtensionDialog(props) {
  // set state variables/handlers
  const [duration, setDurationValue] = useState({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => debug(`${duration.months}---------------------------`));

  // declare props
  const {
    entryId,
    handleClosingClick,
    open,
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

    // .format('YYYY-MM-DD HH:mm');
    debug(`
      releaseDate:    ${moment(releaseDate).format('YYYY-MM-DD HH:mm')}
      newReleaseDate: ${newReleaseDate.format('YYYY-MM-DD HH:mm')}
    `);

    return extendReleaseDate(entryId, newReleaseDate.format('YYYY-MM-DD HH:mm').toString())
      .then(() => handleClosingClick(false))
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

  return (
    <StyledMuiDialog
      aria-labelledby='extend-dialog-title'
      open={open}
      onClose={handleClosingClick}
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
          handleSubmit={handleClosingClick}
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
  open: PropTypes.bool.isRequired,
  handleClosingClick: PropTypes.func.isRequired,
  entryId: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default TimeExtensionDialog;
