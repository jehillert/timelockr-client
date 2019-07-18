/* eslint-disable no-alert */
/* eslint-disable no-func-assign */
import * as Debug from 'debug';
// import chalk from 'chalk';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import {
  FormButton,
  IncrementInput,
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
    handleOpen,
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
      .then(() => handleOpen(false))
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

  const handleCancelClick = () => handleOpen();

  return (
    <Dialog
      aria-labelledby='extend-dialog-title'
      width='26rem'
      open={open}
    >
      <DialogTitle id='form-dialog-title'>
        Extend Time
      </DialogTitle>
      <DialogContent>
        <S.Form noValidate autoComplete='off'>
          {arrayOfInputs}
        </S.Form>
      </DialogContent>
      <DialogActions>
        <FormButton
          type='button'
          handleSubmit={handleCancelClick}
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
      </DialogActions>
    </Dialog>
  );
}

TimeExtensionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  entryId: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default TimeExtensionDialog;
