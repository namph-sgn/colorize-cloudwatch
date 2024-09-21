/*!
 * License: MIT
 * Author: Yusuf YILDIZ
 * http://github.com/yusufff
 */

const WarningBgColor = "#FFFF80",
  InfoBgColor = "#2124B9",
  DebugBgColor = "#2124B9",
  ErrorBgColor = "#FFB3B3",
  TraceBgColor = "#FFFFFF",
  DefaultBgColor = "#FFFFFF",
  WarningColor = "#000000",
  InfoColor = "#FFFFFF",
  DebugColor = "#FFFFFF",
  ErrorColor = "#000000",
  TraceColor = "#888888",
  DefaultColor = "#000000";

const linebreakPattern = "@@"

colorize = () => {
  var iframe = document.getElementById("microConsole-Logs");
  if (!iframe) {
    iframe = document
  };

  const innerDocument = iframe.contentDocument
    ? iframe.contentDocument
    : iframe.contentWindow;
  
  console.log('innerDocument is:', innerDocument);
  if (!innerDocument) return false;

  colorizeLogGroup(innerDocument);
};

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
  window.requestAnimationFrame(colorize);
}, 3000);
