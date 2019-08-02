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
  align-self: stretch;
  margin: auto;
  max-width: ${props => props.theme.cardAreaWidth};

  @media ${device.phone} {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 0;
    padding: ${props => props.theme.p(2)};
  }

  @media ${device.tabletSM} {
    margin-top: ${props => props.theme.m(2)};
    display: grid;
    grid-template-columns: repeat(auto-fill, 45%);
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    grid-gap: ${props => props.theme.gap(1.5)};
  }

  @media ${device.tabletLG} {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    padding-left: ${props => props.theme.p(0)};
    padding-right: ${props => props.theme.p(0)};
  }

  padding-bottom: 100vh;   // prevents anchoring cards to bottom of container

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
