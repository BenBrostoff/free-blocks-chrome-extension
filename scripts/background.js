// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   console.log('Now sending message to ' + JSON.stringify(tabs[0]));
//   chrome.tabs.sendMessage(tabs[0].id,
//     {
//       message: "copyText",
//       textToCopy: "some text"
//     }, function(response) {
//       console.log(response);
//       console.log('Message was sent.');
//       return true;
//     })
// })

chrome.commands.onCommand.addListener(function (command) {
  if (command === "my-custom-shortcut") {
    // Perform the action associated with the shortcut
    console.log("Custom keyboard shortcut activated!");

    // You can perform any action here, such as opening a popup or executing specific code.
  }
});