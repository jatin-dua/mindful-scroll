// content-script.js

let myPort = browser.runtime.connect({ name: "port-from-cs" });
let maxScrollHeight = document.body.scrollHeight;
let curScrollHeight;

myPort.postMessage({ message: "hello from content script" });

myPort.onMessage.addListener((m) => {
  console.log("In content script, received message from background script: ");
  console.log(m.message);
});

document.onscrollend = (event) => {
    curScrollHeight = window.scrollY;
    if (curScrollHeight >= (maxScrollHeight / 2)) {
        myPort.postMessage({ message: "scrollend event fired!"});
    };
}