const sourceInput = document.getElementById('calendar-url');
const buttonInput = document.getElementById('free-times-button');
const output = document.getElementById('output');
const dataHolder = {};

const callKlaviyoWithSlug = (slug) => {
    // TODO - add Klaviyo event here.
    const url = 'https://a.klaviyo.com/client/events/?company_id=ReYugs';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2023-09-15',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            properties: { slug },
            metric: {data: {type: 'metric', attributes: {name: 'Added Slug in Chrome Extension'}}},
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email: 'ben.brostoff@freeblocksapp.com',
                }
              }
            }
          }
        }})
    };

    fetch(url, options)
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
  output.innerHTML = 'Loading free times...'
  const toCall = `https://www.freeblockscal.com/api/free-times-from-slug/${slug}`;
  const response = await fetch(toCall);
  const resJSON = await response.json();
  const freeTimes = resJSON.free_times;
  if (!freeTimes) {
    return;
  }

  const formatted = convertToFormattedString(freeTimes);
  let str = '';
  formatted.forEach(dt => {
    str +=`\n - ${dt}`;
  })

  dataHolder.hiddenContent = str;
  if (dataHolder.hiddenContent) {
    buttonInput.disabled = false;
    callKlaviyoWithSlug(slug);
  } else {
    buttonInput.disabled = true;
  }
}

const populate = async () => {
  const data = await chrome.storage.sync.get();
  const slug = data && data.calendar_slug;
  if (slug) {
    sourceInput.value = slug;
    await retrieveData(slug).finally(() => {
      output.innerHTML = '';
    });
  }
}
populate();

const inputHandler = async function(e) {
  const val = e.target.value;
  const slugValue = await chrome.storage.sync.set({ calendar_slug: val });
  await retrieveData(val).catch(e => {
    buttonInput.disabled = true;
  }).finally(() => {
    output.innerHTML = '';
  });
}

const copyFreeTimes = async function(e) {
  navigator.clipboard.writeText(dataHolder.hiddenContent).then(() => {
    //clipboard successfully set
    output.innerHTML = 'Copied!';
    output.style.color = 'green';
  }, (e) => {
    //clipboard write failed, use fallback
    output.innerHTML = 'An error occurred. Please try again or reach out to ben@freeblocksapp.com';
    output.style.color = 'red';
  });
}


sourceInput.addEventListener('input', inputHandler);
buttonInput.addEventListener('click', copyFreeTimes);