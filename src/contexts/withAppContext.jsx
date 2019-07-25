import React from 'react';
import { AppContext } from 'contexts';

export function withAppContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AppContext.Consumer>
        {(state, getEntries, setUserProp) => (
          <Component
            {...props}
            context={state}
            getEntries={getEntries}
            setUserProp={setUserProp}
          />
        )}
      </AppContext.Consumer>
    );
  };
}

export default withAppContext;
