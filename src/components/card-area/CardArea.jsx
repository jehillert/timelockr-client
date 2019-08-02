// import Debug from 'debug';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from 'utilities';
import {
  Box,
  CardWrapper,
  Header,
} from 'components';

// const debug = Debug('src:components:app:card-area-tabs:card-area');

const S = {};

S.CardArea = styled(Box)`
  display: flex;
  padding-bottom: 100vh;   // prevents anchoring cards to bottom of container
  align-self: stretch;
  margin: auto;

  @media ${device.phone} {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 0;
    padding: ${props => props.theme.p(2)};
  }

  @media ${device.tabletSM} {
    margin-top: ${props => props.theme.m(2)};
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    max-width: ${props => props.theme.cardAreaWidth};
    padding: ${props => props.theme.p(0)};
  }
`;

const CardArea = (props) => {
  const {
    id,
    Card,
    entries,
    refresh,
    title,
  } = props;

  const hasChildren = !!entries.length;

  const [showEntries, updateShowEntries] = useState(false);

  useEffect(() => {
    updateShowEntries(true);
  }, []);


  /*
    To grow columns one at a time instead of left-right-left-right,
    You can map the evens, then the odds.
  */
  return (
    <S.CardArea id={id}>
      {title && <Header text={title} level='3' mx={2} />}
      {(hasChildren && showEntries) && (
        entries.map((entry, index) => (
          <CardWrapper
            key={entry.entryId.toString()}
            index={index}
            refresh={refresh}
            render={wrapper => (
              <Card
                key={entry.entryId.toString()}
                wrapper={wrapper}
                entry={entry}
                index={index}
                refresh={refresh}
              />
            )}
          />
        ))
      )}
    </S.CardArea>
  );
};

CardArea.defaultProps = {
  id: 'card-area',
  title: '',
};

CardArea.propTypes = {
  id: PropTypes.string,
  Card: PropTypes.elementType.isRequired,
  entries: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string,
  refresh: PropTypes.func.isRequired,
};

export default CardArea;
