import { setConfig } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from 'utilities';

setConfig({
  errorReporter: ErrorBoundary,
  logLevel: 'debug',
  hotHooks: true,
  ignoreSFC: !!ReactDOM.setHotElementComparator,
  pureSFC: true,
  pureRender: true,
});
