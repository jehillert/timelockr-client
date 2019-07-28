/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import { Box } from 'components';

/*
  ! think memory leak is because "this.timer" should be a state value.
*/

function CardWrapper(props) {
  const {
    animationDuration,
    delayBetween,
    index,
    refresh,
    render,
  } = props;

  const delayBeforeShow = index * delayBetween;

  const [shouldRenderCard, setCardRenderState] = useState(true);
  const [show, setShowState] = useState(false);

  // Waits for period 'delayBeforeShow' before rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowState((should) => !should);
    }, delayBeforeShow);
      // setCardRenderState((should) => !should);
  }, []);

  const deleteCard = () => {
    setShowState(false)
    setTimeout(() => {
      refresh();
    }, animationDuration);
  };

  return (
    <Box mx={1.5} my={1.5}>
      {shouldRenderCard
        && (
          <Grow
            in={show}
            {...(show ? { timeout: animationDuration } : {})}
          >
          <div>
            {render({ deleteCard })}
          </div>
          </Grow>
        )}
    </Box>
  );
}

CardWrapper.defaultProps = {
  animationDuration: 700,
  delayBeforeShow: 0,
  delayBetween: 150,
};

CardWrapper.propTypes = {
  animationDuration: PropTypes.number,
  delayBetween: PropTypes.number,
  index: PropTypes.number,
  refresh: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default CardWrapper;
