
chrome.runtime.onInstalled.addListener((e) => {
  // TODO - add Klaviyo event here.
  // const url = 'https://a.klaviyo.com/client/events/?company_id=ReYugs';
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     accept: 'application/json',
  //     revision: '2023-09-15',
  //     'content-type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     data: {
  //       type: 'event',
  //       attributes: {
  //         properties: {newKey: 'New Value'},
  //         metric: {data: {type: 'metric', attributes: {name: 'Installed Chrome Extension'}}},
  //         profile: {
  //           data: {
  //             type: 'profile',
  //             attributes: {
  //               email: 'ben.brostoff@freeblocksapp.com',
  //           }
  //         }
  //       }
  //     }
  //   }})
  // };
  //
  // fetch(url, options)
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      const url = request.url;
      fetch(url)
        .then(response => response.json())
        .then(response => sendResponse(response))
        .catch(error => sendResponse(error));
      return true;  // Will respond asynchronously.
  });

// chrome.action.onClicked.addListener(async (tab) => {
//   // await chrome.storage.sync.set({ calendar_url: 'https://freeblockscal.com/book/ben-brostoff'});
//
//   const calendarURL = await chrome.storage.sync.get(['calendar_url']);
//   console.log(calendarURL);
//   // Set the action badge to the next state
//   await chrome.action.setBadgeText({
//     tabId: tab.id,
//     text: 'Copy',
//   });
//
//   // chrome.browserAction.setBadgeText({text: "Copy"}); // We have 10+ unread items.
//   chrome.tabs.sendMessage(tab.id,
//     {
//       message: "copyText",
//       textToCopy: calendarURL,
//     }, function(response) {})
// });