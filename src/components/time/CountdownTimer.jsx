import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import styled from 'styled-components';

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

/*
! change console.log to debug()
*/

/*
I think the problem is you need to watch "futureDate" for changes
or instread of subtracting seconds from a duration,
your state is a "time passed since initialization", and you subtract
"time passed since initialization" from futureDate

or useeffect
*/

function CountdownTimer(props) {
  const { futureDate, refresh } = props;
  const now = moment();
  const later = moment(futureDate);

  const [duration, setDuration] = useState(moment.duration(later.diff(now)));
  const [open, setOpen] = useState(false);
  const [seconds, setFraction] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');

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
    if (duration.asHours() <= 24) {
      setDuration(() => duration.subtract(1, 'seconds'));
    } else if (duration.asDays() <= 30) {
      setDuration(() => duration.subtract(60, 'seconds'));
    }

    setFraction(duration.asSeconds());
    formatDisplayTime();
  };

  useEffect(() => {
    let timer = 0;

    formatDisplayTime();
    if (duration.asHours() <= 24) {
      timer = setInterval(incrementTime, 1000);
    } else if (duration.asDays() <= 30) {
      timer = setInterval(incrementTime, 60000);
    }

    setOpen(true);

    return function cleanup() {
      if (timer) {
        clearInterval(timer);
      }
      setOpen(false);
    };
  }, []);

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

CountdownTimer.propTypes = {
  futureDate: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default CountdownTimer;
