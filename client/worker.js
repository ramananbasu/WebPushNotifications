console.log('Loading Service Worker...');

self.addEventListener('push', (evt) => {
  const data = evt.data.json();
  console.log('**** Received Push Notification *****');
  self.registration.showNotification(data.title, {
    body: 'Notification from API',
    icon: 'http://image.ibb.co/frYOFd/tmlogo.png',
  });
});
