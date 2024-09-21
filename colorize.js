/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

function loadSettings() {
  chrome.storage.sync.get(
    {
      settings: settings,
    },
    function (items) {
      settings = items.settings;
    }
  );
}

colorize = () => {
  var iframe = document.getElementById("microConsole-Logs");
  if (!iframe) {
    iframe = document;
  }

  const innerDocument = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow;

  if (!innerDocument) return false;

  colorizeLogGroup(innerDocument);
};

function getColorsByLogLevel(logMessageText) {
  var result = {};
  if (logMessageText.indexOf("INFO") !== -1) {
    result.color = settings.InfoColor;
    result.bgColor = settings.InfoBgColor;
  } else if (logMessageText.indexOf("WARNING") !== -1) {
    result.color = settings.WarningColor;
    result.bgColor = settings.WarningBgColor;
  } else if (logMessageText.indexOf("ERROR") !== -1) {
    result.color = settings.ErrorColor;
    result.bgColor = settings.ErrorBgColor;
  } else if (logMessageText.indexOf("FATAL") !== -1) {
    result.color = settings.ErrorColor;
    result.bgColor = settings.ErrorBgColor;
  } else if (logMessageText.indexOf("TRACE") !== -1) {
    result.color = settings.TraceColor;
    result.bgColor = settings.TraceBgColor;
  } else if (
    logMessageText.indexOf("START") !== -1 ||
    logMessageText.indexOf("END") !== -1
  ) {
    result.color = settings.DebugColor;
    result.bgColor = settings.DebugBgColor;
  } else {
    result.color = settings.DefaultColor;
    result.bgColor = settings.DefaultBgColor;
  }
  return result;
}

function colorizeLogGroup(innerDocument) {
  const logMessages = innerDocument.querySelectorAll('[class^="awsui_row"]');
  if (logMessages.length === 0) return false;
  logMessages.forEach((log) => {
    const logMessageText = log.innerText;
    if (logMessageText) {
      let result = getColorsByLogLevel(logMessageText);

      const cells = log.querySelectorAll("td");
      if (cells.length > 0) {
        cells.forEach((cell) => {
          cell.style.setProperty('color', result.color, 'important');
          cell.style.setProperty('background-color', result.bgColor, 'important');
          cell.style.setProperty('border-bottom', "1px solid #AAAAAA", 'important');
        });
      }
    }
  });
}

if ("undefined" == typeof colorizeInterval) {
  var colorizeInterval = setInterval(() => {
    if (!chrome.runtime?.id) {
      // The extension was reloaded and this script is orphaned
      clearInterval(colorizeInterval);
      return;
    }
    loadSettings();
    window.requestAnimationFrame(colorize);
  }, 3000);
}
