const express = require('express');
const webpush = require('web-push');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyparser.json());

//  Set Static path


// Create a set of VAPID Keys
const publicVapidKey =
  'BNHOKo9OeBSV8gaeF0v3yQU4Wyri5gEnzyAd0OaxtKQTzZY_lv1cIh52Nn68GMWFTrQjNXa1H_tL75bVTxJ6qIw';
const privateVapidKey = 'RWPVo0b75xnUstuGze_IY8IpLqYKAnrAto0H08tklT8';

// Configure Webpush with VAPID keys
webpush.setVapidDetails(
  'mailto:notifications@server.com',
  publicVapidKey,
  privateVapidKey
);

//  Define Routes for endpoints
//  1. Subscribe Route

app.post('/subscribe', (req, res) => {
  //  retrieve the pushSubscription Object
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title:'Hey there !!',message: 'Push Notification for Event1' });

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 2522;

app.listen(port, () =>
  console.log(`Notification Server Started Successfully at ${port} `)
);
