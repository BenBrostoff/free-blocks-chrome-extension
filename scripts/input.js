console.log('Originally input loaded.');
const sourceInput = document.getElementById('calendar-url');
const buttonInput = document.getElementById('free-times-button');
const dataHolder = {};

const retrieveData = async (slug) => {
  const toCall = `https://www.freeblockscal.com/api/free-times-from-slug/${slug}`;
  console.log(`Calling ${toCall}`);
  //
  const response = await fetch(toCall);
  const resJSON = await response.json();
  // console.log(resJSON);
  const freeTimes = JSON.stringify(resJSON.free_times);
  console.log(freeTimes);
  dataHolder.hiddenContent = freeTimes;
  // console.log('Copied', freeTimes);
}

const populate = async () => {
  const data = await chrome.storage.sync.get();
  const slug = data.calendar_slug;
  if (slug) {
    sourceInput.value = slug;
    await retrieveData(slug);
  }
}

populate();

const inputHandler = async function(e) {
  const val = e.target.value;
  const slugValue = await chrome.storage.sync.set('calendar_slug');
  console.log('Set', slugValue);
}

const copyFreeTimes = async function(e) {

  navigator.clipboard.writeText(dataHolder.hiddenContent).then(() => {
    //clipboard successfully set
    console.log('worked');
  }, (e) => {
    //clipboard write failed, use fallback
    console.log('failed', e);
  });
}

sourceInput.addEventListener('input', inputHandler);
buttonInput.addEventListener('click', copyFreeTimes);