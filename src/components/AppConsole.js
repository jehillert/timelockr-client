import { showConsole } from 'config';

const serverConsole = {};

function createConsole(url, windowName, height = 800, width = 415) {
  // const leftPosition = (screen.width) ? 0.75 * (screen.width - width) : 0;
  // const topPosition = (screen.height) ? 0.75 * (screen.height - height) : 0;
  const leftPosition = 0;
  const topPosition = 0;

  const options = `
    height=${height},
    width=${width}, left=${leftPosition},
    top=${topPosition},
          resizable=no,
    scrollbars=no,
    toolbar=yes,
    menubar=no,
    location=no,
    directories=no,
    status=no`;

  const popupWindow = window.open(url, windowName, options).focus();

  window.onbeforeunload = function closeWithParent() {
    popupWindow.close();
  };

  return popupWindow;
}

serverConsole.isEnabled = false;

if (showConsole === true) {
  serverConsole.isEnabled = true;
  serverConsole.create = createConsole;
}

export default serverConsole;
