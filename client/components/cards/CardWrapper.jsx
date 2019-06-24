/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import styled from 'styled-components';
import { Box } from 'components';

class CardWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRenderCard: false,
      show: false,
    };
  }

  componentDidMount() {
    const { delay } = this.props;
    this.timer = setTimeout(() => {
      this.setState({
        shouldRenderCard: true,
        show: true,
      });
    }, delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {
      show,
      shouldRenderCard,
    } = this.state;
    const { render } = this.props;
    return (
      <Box mx={1.5} my={1.5}>
        {shouldRenderCard
          && (
            <Grow
              in={show}
              {...(show ? { timeout: 300 } : {})}
            >
            <div>
              {render(this.state)}
            </div>
            </Grow>
          )}
      </Box>
    );
  }
}


CardWrapper.defaultProps = {
  delay: 0,
};

CardWrapper.propTypes = {
  delay: PropTypes.number,
  render: PropTypes.func.isRequired,
};

export default CardWrapper;
