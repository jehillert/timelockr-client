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

function LockedEntryCard({ entry, refresh, wrapper }) {
  const { deleteCard } = wrapper;

  const Timer = (
    <CountdownTimer
      creationDate={entry.creationDate}
      refresh={refresh}
      releaseDate={entry.releaseDate}
    />
  );

  return (
    <>
      <StyledMuiCard id={entry.entryId} className='styled-mui-card'>
        <StyledMuiCardHeader
          action={(
            <LockedEntryCardMenu
              deleteCard={deleteCard}
              entryId={entry.entryId}
              refresh={refresh}
              releaseDate={entry.releaseDate}
              creationDate={entry.creationDate}
            />
          )}
          title={entry.description}
        />
        <StyledMuiCardContent>
          {Timer}
        </StyledMuiCardContent>
      </StyledMuiCard>
    </>
  );
}

LockedEntryCard.propTypes = {
  entry: PropTypes.shape({
    description: PropTypes.string,
    entryId: PropTypes.number,
    label: PropTypes.string,
    todaysDate: PropTypes.string,
    creationDate: PropTypes.string,
    releaseDate: PropTypes.string,
    fraction: PropTypes.number,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  wrapper: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default React.memo(LockedEntryCard);
