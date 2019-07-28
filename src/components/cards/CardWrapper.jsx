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
  const { delay, render } = props;

  const [shouldRenderCard, setCardRenderState] = useState(false);
  const [show, setShowState] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardRenderState(true);
      setShowState(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box mx={1.5} my={1.5}>
      {shouldRenderCard
        && (
          <Grow
            in={show}
            {...(show ? { timeout: 300 } : {})}
          >
          <div>
            {render({
              shouldRenderCard,
              show
            })}
          </div>
          </Grow>
        )}
    </Box>
  );
}

CardWrapper.defaultProps = {
  delay: 0,
};

CardWrapper.propTypes = {
  delay: PropTypes.number,
  render: PropTypes.func.isRequired,
};

export default CardWrapper;
