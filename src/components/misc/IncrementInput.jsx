/* eslint-disable no-func-assign */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
  dense: {
    marginTop: 16,
  },
});

function IncrementInput(props) {
  const [value, updateValue] = useState(0);
  const {
    classes,
    handleChange,
    min,
    max,
    units,
  } = props;

  const inputProps = {
    min,
  };

  if (max) {
    inputProps.max = max;
  }

  useEffect(() => handleChange(units, value), [value]);
  // useEffect(() => props.handleChange(props.units, value), [props, value]);

  return (
    <TextField
      id='counter-input'
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={inputProps}
      margin='normal'
      type='number'
      variant='outlined'
      className={classNames(classes.textField, classes.dense)}
      label={units}
      name={units}
      onChange={e => updateValue(e.target.value)}
      value={value}
    />
  );
}

IncrementInput.defaultProps = {
  min: 0,
  max: undefined,
};

IncrementInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  units: PropTypes.string.isRequired,
};

export default withStyles(styles)(IncrementInput);
