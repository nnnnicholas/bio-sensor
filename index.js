var SerialPort = require('serialport'); // include the library
// get port name from the command line:
const portName = process.argv[2];

const threshLow = process.argv[3]; // define lower bounds threshhold in Celsius
const threshHigh = process.argv[4]; // define upper boudns threshhold in Celsius

var myPort = new SerialPort(portName, 9600);

var Readline = SerialPort.parsers.Readline; // make instance of Readline parser
var parser = new Readline(); // make a new parser to read ASCII lines
myPort.pipe(parser); // pipe the serial stream to the parser


// these are the definitions for the serial events:
myPort.on('open', showPortOpen); // called when the serial port opens
myPort.on('close', showPortClose); // called when the serial port closes
myPort.on('error', showError); // called when there's an error with the serial port
parser.on('data', readSerialData); // called when there's new data incoming

function showPortOpen() {
    console.log('port open. Data rate: ' + myPort.baudRate);
}

function readSerialData(data) {
    console.log(data);
    checkThreshold(data, threshLow, threshHigh);
}

function showPortClose() {
    console.log('port closed.');
}

function showError(error) {
    console.log('Serial port error: ' + error);
}


// Twilio logic

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = 'ACCOUNT SID';
const authToken = 'AUTH TOKEN';
const client = require('twilio')(accountSid, authToken);

function checkThreshold(data, threshLow, threshHigh) {
    if (data < threshLow || data > threshHigh) {
    	var msgBody = "Temperature out of bounds.\r\nTemperature: " + data + "°C\r\nRange: " + threshLow + "°C to " + threshHigh + "°C."
        client.messages
            .create({
                body: msgBody,
                from: '+15145008028',
                to: '+15149462453'
            })
            .then(message => console.log(message + "\r\n" + message.sid));

    }
}