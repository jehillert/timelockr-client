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
  color: ${props => props.theme.bgColor3};
  -webkit-tap-highlight-color: transparent;
`;

S.TabList = styled(TabList)`
  @media (min-width: ${props => props.theme.bp3}) {
    width: 100%;
  }
  border-bottom: 1px solid ${props => props.theme.fgColor2};
  margin: 0 0 10px;
  padding: 0;
  text-align: center;
`;

S.Tab = styled(Tab)`
  font-size: 18px;
  display: inline-block;
  border: 1px solid transparent;
  border-bottom: none;
  bottom: -1px;
  position: relative;
  list-style: none;
  padding: 12px 0px;
  cursor: pointer;
  width: 50%;
  color: ${props => props.theme.fgColor1};
  border-radius: ${props => props.theme.tabBorderRadius};

  &.react-tabs__tab--selected {
    border-top: 1px solid ${props => props.theme.bgColor2};
    border-bottom: 1px solid ${props => props.theme.lightColor};
    background-color: ${props => props.theme.lightColor};
    color: ${props => props.theme.fgColor2};
  }

  :not(.react-tabs__tab--selected) {
    border-top: 1px solid ${props => props.theme.bgColor2};
    border-bottom: 1px solid ${props => props.theme.bgColor2};
    background-color: ${props => props.theme.bgColor2};
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
    <S.Tabs selectedIndex={tabIndex} onSelect={t => setTab(t)}>
      <S.TabList>
        <S.Tab>Sign In</S.Tab>
        <S.Tab>Sign Up</S.Tab>
      </S.TabList>

      <S.TabPanel>
        <AuthForm handleSubmit={handleSignin} autocompletePasswordType='current-password' />
      </S.TabPanel>
      <S.TabPanel>
        <AuthForm handleSubmit={handleAddUser} autocompletePasswordType='new-password' />
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
