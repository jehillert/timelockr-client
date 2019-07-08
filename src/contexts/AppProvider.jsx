/* eslint-disable react/no-unused-state */
import * as Debug from 'debug';
import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'contexts';
import { getEntries } from 'utilities';

const debug = Debug('src:contexts:app-provider');

class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      username: '',
      hasAuth: false,
      entries: {},
      locked: [],
      released: [],
    };

    this.refresh = this.refresh.bind(this);
    this.setUserProp = this.setUserProp.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    const { username } = this.state;
    return getEntries(username)
      .then((results) => {
        const { entries } = results;
        const { locked, released } = entries;

        debug('LOCKED:\n%O', locked);
        debug('RELEASED:\n%O', released);

        this.setState(state => ({
          entries,
          locked,
          released,
        }));
      });
  }

  setUserProp = (key, value) => {
    this.setState(state => ({ [key]: value }));
  }

  render() {
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={{
          state: this.state,
          refresh: this.refresh,
          setUserProp: this.setUserProp,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

AppProvider.defaultProps = {
  children: null,
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
