const publicVapidKey =
  'BNHOKo9OeBSV8gaeF0v3yQU4Wyri5gEnzyAd0OaxtKQTzZY_lv1cIh52Nn68GMWFTrQjNXa1H_tL75bVTxJ6qIw';

console.log('Entering Client....');

//  Check for Service Worker
if ('serviceWorker' in navigator) {
  send().catch((err) => console.error(err));
} else {
  console.log('could not find service worker');
}

async function send() {
  //  Register a Service Worker
  console.log('1. Registering the service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/',
  });
  console.log('1. Service worker registered.');

  //  Register a Push
  console.log('2. Registering the Push.....');
  const susbcription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  console.log('2. Push Registered.');

  //  Send a Push
  console.log('3. Sending Subscription to API');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(susbcription),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('3. Subscription sent');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
