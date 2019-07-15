/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { EntryFormDialog } from 'components';
import { ErrorBoundary } from 'utilities';
import PropTypes from 'prop-types';

function EntryFormDialogButton(props) {
  const {
    refresh,
    userId,
    username,
  } = props;

  return (
    <>
      <ErrorBoundary>
        <EntryFormDialog
          refresh={refresh}
          userId={userId}
          username={username}
        />
      </ErrorBoundary>
    </>
  );
}

EntryFormDialogButton.propTypes = {
  refresh: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default EntryFormDialogButton;
