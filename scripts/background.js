console.log('Initialized');

chrome.runtime.onInstalled.addListener(() => {
  // TODO - add Klaviyo event here.

  // Brostoff set
  console.log(
    chrome.storage.sync.get(['calendar_url'])
  );
  console.log('logged');
});

chrome.action.onClicked.addListener(async (tab) => {
  // await chrome.storage.sync.set({ calendar_url: 'https://freeblockscal.com/book/ben-brostoff'});

  const calendarURL = await chrome.storage.sync.get(['calendar_url']);
  console.log(calendarURL);
  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: 'Copy',
  });

  // chrome.browserAction.setBadgeText({text: "Copy"}); // We have 10+ unread items.
  chrome.tabs.sendMessage(tab.id,
    {
      message: "copyText",
      textToCopy: calendarURL,
    }, function(response) {})
});