// background-script.js

let portFromCS;

function connected(p) {
  portFromCS = p;
  portFromCS.postMessage({ greeting: "hi there content script!" });
  portFromCS.onMessage.addListener((m) => {
    
    browser.notifications.create("cakeNotification", {
        type: "basic",
        iconUrl: browser.runtime.getURL("icons/border-48.png"),
        title: "Time for cake!",
        message: "Something something cake",
      });

    portFromCS.postMessage({
      message: `In background script, received message from content script: ${m.message}`,
    });
  });
}

browser.runtime.onConnect.addListener(connected);

browser.browserAction.onClicked.addListener(() => {
  portFromCS.postMessage({ message: "they clicked the button!" });
});
