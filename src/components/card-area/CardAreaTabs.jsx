import Debug from 'debug';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  CardArea,
  LockedEntryCard,
  ReleasedEntryCard,
} from 'components';
import { ErrorBoundary } from 'utilities';

const debug = Debug('src:components:app:card-area-tabs');
const S = {};

S.VerticallyScrollableArea = styled.div`
  height: 89.9vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
      display: none;
    }
`;

S.Tabs = styled(Tabs)`
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  background-color: white;
  box-shadow: ${props => props.theme.boxShadow};
`;

S.Tab = styled(Tab)`
  @media (min-width: ${props => props.theme.bp3}) {
    width: 25%;
  }
  @media (max-width: ${props => props.theme.bp3}) {
    width: 50%;
  }
`;

const styles = theme => ({});

function CardAreaTabs(props) {
  // const windowSize = useWindowSize();
  const {
    entries,
    refresh,
    theme,
  } = props;

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
          indicatorColor='primary'
          textColor='primary'
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
            <CardArea
              mt={2}
              id='card-area-released'
              Card={ReleasedEntryCard}
              delayIncrement={100}
              entries={entries.released}
              refresh={refresh}
            />
          </S.VerticallyScrollableArea>
        </ErrorBoundary>
        <ErrorBoundary>
          <S.VerticallyScrollableArea>
            <CardArea
              id='card-area-locked'
              Card={LockedEntryCard}
              delayIncrement={100}
              entries={entries.locked}
              refresh={refresh}
            />
          </S.VerticallyScrollableArea>
        </ErrorBoundary>
      </SwipeableViews>
    </>
  );
}

CardAreaTabs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  entries: PropTypes.shape({
    locked: PropTypes.array,
    released: PropTypes.array,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CardAreaTabs);
