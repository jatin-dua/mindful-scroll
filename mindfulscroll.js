// content-script.js

let myPort = browser.runtime.connect({ name: "port-from-cs" });
myPort.postMessage({ message: "hello from content script" });

myPort.onMessage.addListener((m) => {
  console.log("In content script, received message from background script: ");
  console.log(m.message);
});

document.onscrollend = (event) => {
    myPort.postMessage({ message: "scrollend event fired!"});
};