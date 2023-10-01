console.log('Initialized');

chrome.runtime.onInstalled.addListener(() => {
  // TODO - add Klaviyo event here.
});

chrome.action.onClicked.addListener(async (tab) => {
  chrome.tabs.sendMessage(tab.id,
    {
      message: "copyText",
      textToCopy: "some text"
    }, function(response) {})
});