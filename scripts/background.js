chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  console.log('Now sending message to ' + JSON.stringify(tabs[0]));
  chrome.tabs.sendMessage(tabs[0].id,
    {
      message: "copyText",
      textToCopy: "some text"
    }, function(response) {
      console.log(response);
      console.log('Message was sent.');
      return true;
    })
})