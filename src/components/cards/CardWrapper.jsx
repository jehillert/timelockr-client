/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-indent */
import * as Debug from 'debug';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import { Box } from 'components';

const debug = Debug('src:components:card-wrapper');

function CardWrapper({ animationDuration, delayBetween, index, refresh, render }) {
  debug('[CardWrapper] rendered');

  const showDelay = index * delayBetween;
  const [shouldRenderCard, setCardRenderState] = useState(true);
  const [show, setShowState] = useState(false);

  // Waits for period 'showDelay' before rendering
  useEffect(() => {
    setTimeout(() => {
      setShowState(() => true);
    }, showDelay);
  }, [showDelay]);

  const deleteCard = () => {
    setShowState(false);
    setTimeout(() => {
      refresh();
      setCardRenderState(false);
    }, animationDuration);
  };

  return (
    <>
      {shouldRenderCard
        && (
        <>
          <Grow
            in={show}
            {...(show ? { timeout: animationDuration } : {})}
          >
          <div>
            {render({ deleteCard })}
          </div>
          </Grow>
        </>
      )}
    </>
  );
}

CardWrapper.defaultProps = {
  animationDuration: 700,
  delayBetween: 150,
};

CardWrapper.propTypes = {
  animationDuration: PropTypes.number,
  delayBetween: PropTypes.number,
  index: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
};

export default React.memo(CardWrapper);
