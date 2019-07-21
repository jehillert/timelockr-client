import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S = {};

S.CircleBackground = styled.circle`
  fill: none;
  stroke: #ddd;
`;

S.CircleProgress = styled.circle`
  fill: none;
  stroke: red;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

S.CircleText = styled.div`
  font-size: 3em;
  font-weight: bold;
  fill: red;
`;

const CircularProgress = (props) => {
  const { percentage, sqSize, strokeWidth } = props;
  // sqSize: Size of the enclosing square
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - dashArray * percentage / 100;

  return (
    <svg
        width={sqSize}
        height={sqSize}
        viewBox={viewBox}>
        <circle
          className='circle-background'
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`} />
        <circle
          className='circle-progress'
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} />
        <div
          className='circle-text'
          x='50%'
          y='50%'
          dy='.3em'
          textAnchor='middle'>
          {`${percentage}%`}
        </div>
    </svg>
  );
}

CircularProgress.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
};

CircularProgress.PropTypes = {
  percentage: PropTypes.number,
  sqSize: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default CircularProgress;

