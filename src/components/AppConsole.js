const openConsole = (url, windowName, height = 500, width = 415) => {
  const leftPosition = (screen.width) ? 0.75 * (screen.width - width) : 0;
  const topPosition = (screen.height) ? 0.75 * (screen.height - height) : 0;
  const options = `height=${height}, width=${width}, left=${leftPosition}, top=${topPosition}, resizable=no, scrollbars=no, toolbar=yes, menubar=no, location=no, directories=no, status=no`;

  return window.open(url, windowName, options);
};

const closeConsole = () => {
  this.close();
  return {};
};

export { openConsole, closeConsole };
