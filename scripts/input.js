console.log('Originally input loaded.');
const sourceInput = document.getElementById('calendar-url');
const buttonInput = document.getElementById('free-times-button');

const inputHandler = function(e) {
  const val = e.target.value;
  chrome.storage.sync.set({ calendar_slug: val });
}

const copyFreeTimes = async function(e) {
  const slugData = await chrome.storage.sync.get(['calendar_slug']);
  const slug = slugData.calendar_slug;

  const toCall = `https://www.freeblockscal.com/api/free-times-from-slug/${slug}`;
  console.log(`Calling ${toCall}`);

  const response = await fetch(toCall);
  const resJSON = await response.json();
  console.log(resJSON);
  const freeTimes = resJSON.free_times;
  console.log('Copied', freeTimes);

  navigator.clipboard.writeText('here we go fucker').then(() => {
    //clipboard successfully set
    console.log('worked')
  }, (e) => {
    //clipboard write failed, use fallback
    console.log('fauled', e);
  });
}

sourceInput.addEventListener('input', inputHandler);
buttonInput.addEventListener('click', copyFreeTimes);