console.log('run.js invoked');
console.log(document);

// const textArea = document.createElement("textarea");
// textArea.value = "My Free Times are...";
// document.body.appendChild(textArea);
// textArea.select();
// document.execCommand("copy");
// document.body.removeChild(textArea);
//
// console.log('Copied.');

chrome.runtime.onMessage.addListener( // this is the message listener
  function(request, sender, sendResponse) {
    console.log('Received!');
    console.log(request);
    if (request) {
      copyToTheClipboard('My free times are... ' + request.message);
    }
    sendResponse({ response: 'Got response back'});
  }
);

function copyToTheClipboard(textToCopy){
  console.log('copied Jimminy.');
  document.execCommand('copy', textToCopy);
}
