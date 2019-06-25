import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from 'react-tabs';
import styled from 'styled-components';
import { AuthForm } from 'components';

const S = {};

S.Tabs = styled(Tabs)`
  -webkit-tap-highlight-color: transparent;
`;

S.TabList = styled(TabList)`
  border-bottom: 1px solid ${props => props.theme.primaryColor};
  margin: 0 0 10px;
  padding: 0;
  text-align: center;
`;

S.Tab = styled(Tab)`
  display: inline-block;
  border: 1px solid transparent;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 12px 0px;
  cursor: pointer;
  width: 50%;
  color: ${props => props.theme.textColor1};
  border-radius: ${props => props.theme.tabBorderRadius};

  &.react-tabs__tab--selected {
    border-top: 1px solid #C7CACD;
    border-bottom: 1px solid ${props => props.theme.backgroundColor};
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.primaryColor};
  }

  :not(.react-tabs__tab--selected) {
    border-top: 1px solid ${props => props.theme.primaryColor};
    border-bottom: 1px solid ${props => props.theme.primaryColor};
    background-color: ${props => props.theme.primaryColor};
  }

  :not(.react-tabs__tab--selected):hover {
    background-color: ${props => props.theme.backgroundHoverColor};
    border-color: ${props => props.theme.backgroundBorderHoverColor};
  }
`;

S.TabPanel = styled(TabPanel)`
  &.react-tabs__tab-panel {
    display: none;
  }
  &.react-tabs__tab-panel--selected {
    display: block;
  }
`;

const AuthTabs = (props) => {
  const {
    handleSignin,
    handleAddUser,
    setTitle,
  } = props;

  // Titles left the same for now...
  const [tabIndex, setTab] = useState(0);
  useEffect(() => {
    if (tabIndex === 0) {
      return setTitle('TimeLockr');
    }

    return setTitle('TimeLockr');
  }, [tabIndex, setTitle]);

  return (
    <S.Tabs selectedIndex={tabIndex} onSelect={tabIndex => setTab(tabIndex)}>
      <S.TabList>
        <S.Tab>Sign In</S.Tab>
        <S.Tab>Sign Up</S.Tab>
      </S.TabList>

      <S.TabPanel>
        <AuthForm handleSubmit={handleSignin} />
      </S.TabPanel>
      <S.TabPanel>
        <AuthForm handleSubmit={handleAddUser} />
      </S.TabPanel>
    </S.Tabs>
  );
};

AuthTabs.propTypes = {
  handleSignin: PropTypes.func.isRequired,
  handleAddUser: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default (AuthTabs);
