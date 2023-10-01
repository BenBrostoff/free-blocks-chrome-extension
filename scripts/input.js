console.log('Originally input loaded.');
const sourceInput = document.getElementById('calendar-url');
const buttonInput = document.getElementById('free-times-button');
const dataHolder = {};

function convertToFormattedString(events) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formattedEvents = events.map(event => {
    const startTime = new Date(event.start);
    const endTime = new Date(event.end);

    const weekday = weekdays[startTime.getUTCDay()];
    const startHour = startTime.getUTCHours();
    const startMinutes = startTime.getUTCMinutes();
    const endHour = endTime.getUTCHours();
    const endMinutes = endTime.getUTCMinutes();

    const startTimeString = `${startHour}:${startMinutes.toString().padStart(2, '0')}`;
    const endTimeString = `${endHour}:${endMinutes.toString().padStart(2, '0')}`;

    return `${weekday}, ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(startTime)}, ${startTimeString}${startHour >= 12 ? 'PM' : 'AM'}-${endTimeString}${endHour >= 12 ? 'PM' : 'AM'}`;
  });

  return formattedEvents;
}

function convertToFormattedString(events) {
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const formattedEvents = events.map(event => {
    const startTime = new Date(event.start);
    const endTime = new Date(event.end);

    const weekday = weekdays[startTime.getUTCDay()];
    const startHour = startTime.getUTCHours() % 12 || 12; // Convert to 12-hour format
    const startMinutes = startTime.getUTCMinutes();
    const endHour = endTime.getUTCHours() % 12 || 12; // Convert to 12-hour format
    const endMinutes = endTime.getUTCMinutes();
    const ampmStart = startTime.getUTCHours() >= 12 ? 'PM' : 'AM';
    const ampmEnd = endTime.getUTCHours() >= 12 ? 'PM' : 'AM';

    const startTimeString = `${startHour}:${startMinutes.toString().padStart(2, '0')}${ampmStart}`;
    const endTimeString = `${endHour}:${endMinutes.toString().padStart(2, '0')}${ampmEnd}`;

    return `${weekday}, ${new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(startTime)}, ${startTimeString} - ${endTimeString}`;
  });

  return formattedEvents;
}

const retrieveData = async (slug) => {
  const toCall = `https://www.freeblockscal.com/api/free-times-from-slug/${slug}`;
  console.log(`Calling ${toCall}`);
  //
  const response = await fetch(toCall);
  const resJSON = await response.json();
  // console.log(resJSON);
  const freeTimes = resJSON.free_times;
  const formatted = convertToFormattedString(freeTimes);
  let str = '';
  formatted.forEach(dt => {
    str +=`\n - ${dt}`;
  })

  dataHolder.hiddenContent = str;
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