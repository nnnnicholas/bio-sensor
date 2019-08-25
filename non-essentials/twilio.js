// import secrets

const fs = require('fs'); // import file system

var secrets = fs.readFileSync('secrets.json');
secrets = JSON.parse(secrets);

var accountSid = secrets.accountSid;
var authToken = secrets.authToken;


// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15145008028',
     to: '+15149462453'
   })
  .then(message => console.log(message.sid));
