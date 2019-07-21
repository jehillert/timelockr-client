import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import styled from 'styled-components';
import { usePrevious } from 'utilities';
import { CircularProgress } from 'components';
import Promise from 'bluebird';

momentDurationFormatSetup(moment);

const S = {};

S.CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.CountdownText = styled.div`
  z-index: 1;
  text-align: center;
  text-anchor: middle;
`;

S.CountdownText = styled.div`
  z-index: 1;
  text-align: center;
  text-anchor: middle;
`;

S.CountdownText = styled.div`
  z-index: 1;
  text-align: center;
  text-anchor: middle;
`;

function CountdownTimer(props) {
  const { creationDate, releaseDate, refresh } = props;
  const before = moment(creationDate);
  const now = moment();
  const later = moment(releaseDate);
  const timeBase = moment.duration(later.diff(before));

  const intervalRef = useRef();

  const [open, setOpen] = useState(false);
  const [fraction, setFraction] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

  const [duration, setDuration] = useState(moment.duration(later.diff(now)));
  const prevSeconds = usePrevious(duration.asSeconds());

  const formatDisplayTime = () => {
    let tr;

    if (duration.asSeconds() <= 0) {
      return refresh();
    }

    if (duration.years()) {
      tr = duration.format('y [years], M [months], d [days]', { trim: 'all' });
    } else if (duration.months()) {
      tr = duration.format('M [months], d [days], h [hours]', { trim: 'all' });
    } else if (duration.days()) {
      tr = duration.format('d [days], h [hours], m [min]', { trim: 'all' });
    } else {
      tr = duration.format('hh:mm:ss', { trim: false });
    }

    setTimeRemaining(tr);
  };

  const incrementTime = () => {
    setDuration(() => duration.subtract(1, 'seconds'));
    formatDisplayTime();
  };

  useEffect(() => {
    let timer = 0;

    if (prevSeconds !== moment.duration(later.diff(now)).asSeconds()) {
      const seconds = moment.duration(later.diff(now)).asSeconds();
      const extension = seconds - duration.asSeconds();
      setDuration(() => duration.add(extension, 'seconds'));
      clearInterval(intervalRef.current);
    }

    formatDisplayTime();
    intervalRef.current = setInterval(incrementTime, 1000);
    setOpen(true);

    return function cleanup() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setOpen(false);
    };
  }, [releaseDate]);

  return (
    <S.CountdownContainer>
      {open && (
        <>
          <S.CountdownText>
            {timeRemaining}
          </S.CountdownText>
        </>
      )}
    </S.CountdownContainer>
  );
}
//          <CircularProgress
//            percentage={duration.asSeconds() / timeBase.asSeconds() * 100}
//            strokeWidth={10}
//            sqSize={200}
//          />

CountdownTimer.propTypes = {
  creationDate: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CountdownTimer;
