// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CountdownTimer,
  StyledMuiCard,
  StyledMuiCardHeader,
  StyledMuiCardContent,
  LockedEntryCardMenu,
} from 'components';

const LockedEntryCard = (props) => {
  const { entry, refresh, wrapper } = props;
  const { shouldRenderCard } = wrapper;

  const [displayMode, setDisplayMode] = useState(1);

  const Timer = (
    <CountdownTimer
      creationDate={entry.creationDate}
      refresh={refresh}
      releaseDate={entry.releaseDate} />
  );

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
                  creationDate={entry.creationDate}
                />
              )}
              title={entry.description}
            />
            <StyledMuiCardContent>
              {(displayMode === 1) && Timer}
              {(displayMode === 2) && TimerAndCircProgress}
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
