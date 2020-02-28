// import Debug from 'debug';
import React, { Suspense, lazy, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  LockedEntryCard,
  ReleasedEntryCard,
} from 'components';
import { ErrorBoundary } from 'utilities';

const CardArea = lazy(() => import('./CardArea'));
// const debug = Debug('src:components:app:card-area-tabs');

const S = {};
const styles = theme => ({});

S.VerticallyScrollableArea = styled.div`
  @media (max-width: ${({ theme }) => theme.bp[4]}) {
    width: 100vw;
  }
  height: 89.9vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
      display: none;
    }
  -webkit-overflow-scrolling: touch;
`;

S.Tabs = styled(Tabs)`
  @media (max-width: ${({ theme }) => theme.bp[4]}) {
    width: 100vw;
  }
  background-color: white;
  box-shadow: ${({ theme }) => theme.boxShadow};
  .MuiTab-wrapper {
    color: ${({ theme }) => theme.darkColor};
  }
  .Mui-selected .MuiTab-wrapper {
    color: ${({ theme }) => theme.primary};
  }
  .MuiTabs-indicator {
    width: 100%;
    background-color: ${({ theme }) => theme.primary};
  }
  span {
    outline: none;
  }
`;

S.Tab = styled(Tab)`
  @media (max-width: ${({ theme }) => theme.bp[4]}) {
    width: 100vw;
  }
`;


function CardAreaTabs({ entries, refresh, theme }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, v) => setValue(v);
  const handleChangeIndex = index => setValue(index);

  // debug('LOCKED.jsx:\n%O', entries.locked);
  // debug('RELEASED:\n%O', entries.released);

  return (
    <>
      <ErrorBoundary>
        <S.Tabs
          value={value}
          onChange={handleChange}
          variant='fullWidth'
        >
          <S.Tab label='Unlocked' />
          <S.Tab label='Locked' />
        </S.Tabs>
      </ErrorBoundary>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <ErrorBoundary>
          <S.VerticallyScrollableArea>
            <Suspense fallback={<div></div>}>
              <CardArea
                mt={2}
                id='card-area-released'
                Card={ReleasedEntryCard}
                entries={entries.released}
                refresh={refresh}
              />
            </Suspense>
          </S.VerticallyScrollableArea>
        </ErrorBoundary>
        <ErrorBoundary>
          <S.VerticallyScrollableArea>
            <Suspense fallback={<div></div>}>
              <CardArea
                id='card-area-locked'
                Card={LockedEntryCard}
                entries={entries.locked}
                refresh={refresh}
              />
            </Suspense>
          </S.VerticallyScrollableArea>
        </ErrorBoundary>
      </SwipeableViews>
    </>
  );
}

CardAreaTabs.propTypes = {
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardAreaTabs);
