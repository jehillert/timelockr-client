// eslint-disable-next-line no-unused-vars
import React, { Fragment, useRef, useState } from 'react';
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
import { withSnackbar } from 'notistack';
import { CopyToClipboard, deleteEntry, ErrorBoundary } from 'utilities';

const S = {};

S.IconButton = styled(IconButton)`
  &.s-icon-button {
    padding: 8px 7px 8px 7px;
  }
`;

/*
! ADD 'MASONRY' LAYOUT !
  check this one out first:
    https://www.npmjs.com/package/react-masonry-css
  then these:
    https://www.npmjs.com/package/react-masonry-component
    https://www.npmjs.com/package/react-native-masonry-list
    https://www.npmjs.com/package/react-masonry-layout
*/

const ReleasedEntryCard = (props) => {
  const [copied, updateCopied] = useState(false);
  const [anchorEl, updateAnchorEl] = useState(null);

  const { entry, refresh, wrapper } = props;
  const { entryId, content, description } = entry;
  const { shouldRenderCard } = wrapper;

  const handleCloseButtonClick = () => (
    deleteEntry(entry.entryId)
      .then(() => refresh())
  );

  const handleCardClick = (event) => {
    updateAnchorEl(event.currentTarget);
    return updateCopied(false);
  };

  return (
    <ErrorBoundary>
      {shouldRenderCard && (
        <>
          {anchorEl && (
            <ClipboardPopover
              trigger={copied}
              anchorEl={anchorEl}
            />
          )}
          <CopyToClipboard
            text={`DESCRIPTION:\n\t${description}\n\nCONTENT:\n\t${content}`}
            onCopy={() => updateCopied(true)}
          >
            <StyledMuiCard id={entryId} className='styled-mui-card'>
              <StyledMuiCardHeader
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
              <StyledMuiCardContent onClick={handleCardClick}>
                <Typography>
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

export default withSnackbar(ReleasedEntryCard);
