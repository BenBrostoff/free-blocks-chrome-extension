console.log('Initialized');

chrome.runtime.onInstalled.addListener(() => {
  // TODO - add Klaviyo event here.

  // Brostoff set
});

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.storage.sync.set({ calendar_url: 'https://freeblockscal.com/book/ben-brostoff'});

  const calendarURL = await chrome.storage.sync.get(['calendar_url']);
  chrome.tabs.sendMessage(tab.id,
    {
      message: "copyText",
      textToCopy: calendarURL,
    }, function(response) {})
});