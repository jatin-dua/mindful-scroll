// background-script.js

let portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({ greeting: "hi there content script!" });
  portFromCS.onMessage.addListener((m) => {
    portFromCS.postMessage({
      message: `In background script, received message from content script: ${m.message}`,
    });
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(() => {
  portFromCS.postMessage({ message: "they clicked the button!" });
});
