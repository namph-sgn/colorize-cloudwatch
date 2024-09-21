/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

function loadSettings() {
    chrome.storage.sync.get({
      settings: settings
    }, function(items) { settings = items.settings; });
}

function getColorsByLogLevel(logMessageText) {
  var result = {}
  if (logMessageText.indexOf("INFO") !== -1) {
    result.color = settings.InfoColor;
    result.bgColor = settings.InfoBgColor;
  } else if (logMessageText.indexOf("WARN") !== -1) {
    result.color = settings.WarningColor;
    result.bgColor = settings.WarningBgColor;
  } else if (logMessageText.indexOf("ERROR") !== -1) {
    result.color = settings.ErrorColor;
    result.bgColor = settings.ErrorBgColor;
  } else if (logMessageText.indexOf("FATAL") !== -1) {
      result.color = settings.ErrorColor;
      result.bgColor = settings.ErrorBgColor;
  } else if (logMessageText.indexOf("DEBUG") !== -1) {
    result.color = settings.DebugColor;
    result.bgColor = settings.DebugBgColor;
  } else if (logMessageText.indexOf("TRACE") !== -1) {
    result.color = settings.TraceColor;
    result.bgColor = settings.TraceBgColor;
  } else {
    result.color = settings.DefaultColor;
    result.bgColor = settings.DefaultBgColor;
  }
  return result;
}

function colorizeLogGroup(innerDocument) {
    const logMessages = innerDocument.querySelectorAll('[class^="awsui_row"]');
    if (logMessages.length === 0) return false;
    console.log('Calling colorizeLogGroup');
    logMessages.forEach(log => {
        const logMessageText = log.innerText;
        if (logMessageText) {
          let result = getColorsByLogLevel(logMessageText)

          const cells = log.querySelectorAll("td");
          if (cells.length > 0) {
          cells.forEach(cell => {
              cell.style.color = result.color;
              cell.style.backgroundColor = result.bgColor;
              cell.style.borderBottom = "1px solid #AAAAAA";
          });
        }
      }
    });
}

function getColorsByLogLevel(logMessageText) {
  var result = {}
  if (logMessageText.indexOf("INFO") !== -1) {
    result.color = InfoColor;
    result.bgColor = InfoBgColor;
  } else if (logMessageText.indexOf("WARNING") !== -1) {
    result.color = WarningColor;
    result.bgColor = WarningBgColor;
  } else if (logMessageText.indexOf("ERROR") !== -1) {
    result.color = ErrorColor;
    result.bgColor = ErrorBgColor;
  } else if (logMessageText.indexOf("FATAL") !== -1) {
      result.color = ErrorColor;
      result.bgColor = ErrorBgColor;
  } else if (logMessageText.indexOf("START") !== -1 || logMessageText.indexOf("END") !== -1) {
    result.color = DebugColor;
    result.bgColor = DebugBgColor;
  } else {
    result.color = DefaultColor;
    result.bgColor = DefaultBgColor;
  }
  return result;
}

const colorizeInterval = setInterval(() => {
  loadSettings();
  window.requestAnimationFrame(colorize);
}, 3000);
