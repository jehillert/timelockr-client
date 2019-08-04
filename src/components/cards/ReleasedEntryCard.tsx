// eslint-disable-next-line no-unused-vars
import * as Debug from 'debug';
import React, { useState } from 'react';
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

const debug = Debug('src:components:released-entry-card');
const S = {};

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 8px 7px 8px 7px;
  }
`;

const ReleasedEntryCard = (props) => {
  debug('[ReleasedEntryCArd] rendered');

  const [anchorEl, updateAnchorEl] = useState(null);
  const { entry, wrapper } = props;
  const { content, description } = entry;
  const { entryId } = entry;
  const { deleteCard } = wrapper;

  const handleCloseButtonClick = () => (
    deleteEntry(entry.entryId)
      .then(() => deleteCard())
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
      {Boolean(anchorEl) && (
        <ClipboardPopover
          anchorEl={anchorEl}
        />
      )}
      <StyledMuiCard id={entryId} className='styled-mui-card'>
        <CopyToClipboard text={description}>
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
        </CopyToClipboard>
        <CopyToClipboard text={content}>
          <StyledMuiCardContent onClick={handleCopyClick}>
            <Typography css='white-space: pre-line; font-size: 0.9rem;'>
              {content}
            </Typography>
          </StyledMuiCardContent>
        </CopyToClipboard>
      </StyledMuiCard>
    </ErrorBoundary>
  );
};

ReleasedEntryCard.propTypes = {
  entry: PropTypes.shape({
    entryId: PropTypes.number,
    description: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  wrapper: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ReleasedEntryCard;
