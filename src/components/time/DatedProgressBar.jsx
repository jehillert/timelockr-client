import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Box } from 'components';

const S = {};
S.Box = styled(Box)`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
`;

S.ProgressBar = styled(ProgressBar)`
  height: 1.3rem;
  margin-top: .7rem;
  margin-bottom: .7rem;
`;

const DatedProgressBar = (props) => {
  const { entry } = props;
  const { creationDate, fraction, releaseDate } = entry;
  // moment(myDate).calendar()  --->  MM/DD/YYYY format
  return (
    <>
      <S.Box>
        <span>Created</span>
        <span>Release</span>
      </S.Box>
      <Box>
        <S.ProgressBar variant='danger' now={fraction * 100} />
      </Box>
      <S.Box>
        <span>{moment(creationDate).format('MMM DD, YYYY')}</span>
        <span>{moment(releaseDate).format('MMM DD, YYYY')}</span>
      </S.Box>
      <S.Box>
        <span>{moment(creationDate).format('h:mm A')}</span>
        <span>{moment(releaseDate).format('h:mm A')}</span>
      </S.Box>
    </>
  );
};

DatedProgressBar.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default DatedProgressBar;
