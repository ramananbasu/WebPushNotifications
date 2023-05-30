console.log('Loading Service Worker...');

self.addEventListener('push', (evt) => {
  const data = evt.data.json();
  console.log('**** Received Push Notification *****');
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: 'https://github.com/ramananbasu/WebPushNotifications/raw/main/Sentara_AppIcon_Round.png',
  });
});
