/* eslint-disable react/forbid-prop-types */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
// import { makeStyles } from '@material-ui/core/styles';
import { Box } from 'components';

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//   },
// });

const S = {};
S.Box = styled(Box)`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
`;

S.LinearProgress = styled(LinearProgress)`
  height: 1.3rem;
  margin-top: .7rem;
  margin-bottom: .7rem;
`;

const LinearProgressWithDates = (props) => {
  // const classes = useStyles();
  const { entry } = props;
  const { creationDate, fraction, releaseDate } = entry;
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted((oldCompleted) => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  // moment(myDate).calendar()  --->  MM/DD/YYYY format
  return (
    <>
      <S.Box>
        <span>Created</span>
        <span>Release</span>
      </S.Box>
      <Box>
        <LinearProgress color='secondary' variant='determinate' value={completed} />
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

LinearProgressWithDates.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default LinearProgressWithDates;
{/* <Box>
  <S.LinearProgress variant='danger' now={fraction * 100} />
</Box> */}
