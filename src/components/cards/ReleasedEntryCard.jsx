// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {
  ClipboardPopover,
  StyledMuiCard,
  StyledMuiCardContent,
  StyledMuiCardHeader,
} from 'components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { deleteEntry, ErrorBoundary } from 'utilities';

const S = {};

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 8px 7px 8px 7px;
  }
`;

const ReleasedEntryCard = (props) => {
  const [anchorEl, updateAnchorEl] = useState(null);

  const { entry, refresh, wrapper } = props;
  const { content, description } = entry;
  const { entryId } = entry;
  const { shouldRenderCard } = wrapper;

  const handleCloseButtonClick = () => (
    deleteEntry(entry.entryId)
      .then(() => refresh())
  );

  const handleCopyClick = (event) => {
    if (event.target.nodeName !== 'svg' && event.target.nodeName !== 'BUTTON') {
      updateAnchorEl(event.currentTarget);
      const timeoutID = setTimeout(() => {
        updateAnchorEl(null);
        return clearTimeout(timeoutID);
      }, 600);
    }
  };

  /*
    ! FIX BUG: onClick={handleCopyClick} is find
    ! in the card body but causes a memory leak when
    ! it is in the head
  */
  return (
    <ErrorBoundary>
      {shouldRenderCard && (
        <>
          {Boolean(anchorEl) && (
            <ClipboardPopover
              anchorEl={anchorEl}
            />
          )}
          <CopyToClipboard
            text={`${description}\n${'─'.repeat(description.length)}\n${content}`}
          >
            <StyledMuiCard id={entryId} className='styled-mui-card'>
              <StyledMuiCardHeader
                onClick={handleCopyClick}
                action={(
                  <S.IconButton
                    className='s-icon-button'
                    onClick={handleCloseButtonClick}
                  >
                    <CloseIcon />
                  </S.IconButton>
                )}
                title={description}
              />
              <StyledMuiCardContent onClick={handleCopyClick}>
                <Typography css='white-space: pre-line;'>
                  {content}
                </Typography>
              </StyledMuiCardContent>
            </StyledMuiCard>
          </CopyToClipboard>
        </>
      )}
    </ErrorBoundary>
  );
};

ReleasedEntryCard.propTypes = {
  entry: PropTypes.shape({
    entryId: PropTypes.number,
    description: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  refresh: PropTypes.func.isRequired,
  wrapper: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default ReleasedEntryCard;
