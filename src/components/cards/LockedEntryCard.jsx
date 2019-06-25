// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgressBar,
  CountdownTimer,
  StyledMuiCard,
  StyledMuiCardHeader,
  StyledMuiCardContent,
  LockedEntryCardMenu,
} from 'components';

/*
! provide user a way to control mode
  1 - 'TIMER ONLY'
  2 - 'TIMER PLUS PROGRESS'
  3 - 'RELEASE-DATE OVERLAY'
*/

const LockedEntryCard = (props) => {
  const { entry, refresh, wrapper } = props;
  const { shouldRenderCard } = wrapper;

  const [displayMode, setDisplayMode] = useState(1);


  const renderTimer = (
    <CountdownTimer refresh={refresh} futureDate={entry.releaseDate} />
  );

  // const [frctn, setFraction] = useState(fraction);
  // const handleChangeEvent = (event) => {
  //   setFraction(event.target.value);
  // }
  // const renderTimerAndCircProgress = () => (
  //   <CircularProgressBar
  //     strokeWidth='10'
  //     sqSize='200'
  //     percentage={fraction}
  //     futureDate={entry.releaseDate}
  //     referenceDate={entry.creationDate}
  //   />
  //   <CountdownTimer refresh={refresh} futureDate={entry.releaseDate} />
  // );

  return (
    <>
      {shouldRenderCard
        && (
          <StyledMuiCard id={entry.entryId} className='styled-mui-card'>
            <StyledMuiCardHeader
              action={(
                <LockedEntryCardMenu
                  entryId={entry.entryId}
                  refresh={refresh}
                  releaseDate={entry.releaseDate}
                />
              )}
              title={entry.description}
            />
            <StyledMuiCardContent>
              {(displayMode === 1) && renderTimer}
              {(displayMode === 2) && renderTimerAndCircProgress}
            </StyledMuiCardContent>
          </StyledMuiCard>
        )
      }
    </>
  );
};

LockedEntryCard.propTypes = {
  entry: PropTypes.shape({
    entryId: PropTypes.number,
    label: PropTypes.string,
    todaysDate: PropTypes.string,
    creationDate: PropTypes.string,
    releaseDate: PropTypes.string,
    fraction: PropTypes.number,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  wrapper: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default LockedEntryCard;
