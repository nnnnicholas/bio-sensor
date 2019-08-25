// import secrets
const fs = require('fs'); // import file system
var secrets = fs.readFileSync('secrets.json'); // read secrets.json
secrets = JSON.parse(secrets); // parse secrets

var accountSid = secrets.accountSid; // assign secrets to variables
var authToken = secrets.authToken;

var SerialPort = require('serialport'); // include the library
const portName = process.argv[2]; // get port name from the command line:
const threshLow = process.argv[3]; // define lower bounds threshhold in Celsius
const threshHigh = process.argv[4]; // define upper boudns threshhold in Celsius
const interval = (process.argv[5] * 1000); // inteval at which to update (in seconds)


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

var currentTemp = null;

function readSerialData(data) {
    currentTemp = parseFloat(data); // parse serial data string as float
    // console.log(currentTemp);
}

function showPortClose() {
    console.log('port closed.');
}

function showError(error) {
    console.log('Serial port error: ' + error);
}


// Twilio 
const client = require('twilio')(accountSid, authToken);

setInterval(checkThreshold, interval); // Set interval at which to evaluate sensor readings

var temperatureBuffer = [];

function checkThreshold() {
    console.log(currentTemp);
    temperatureBuffer.push({ "time": new Date(), "tepmerature": currentTemp });
    if (temperatureBuffer.length >= 60000 / interval) { // Every 1 minute, save the buffer to disk then clear its contents
    	// write to disk
    };
    if (currentTemp === null) {
        console.log("data is null");
    } else if (currentTemp < threshLow || currentTemp > threshHigh) {
        // currentTemp = currentTemp.substring(0, 4);
        var msgBody = "Temperature out of bounds.\r\nTemperature: " + currentTemp + "°C\r\nRange: " + threshLow + "°C to " + threshHigh + "°C."
        console.log("Sending text : " + msgBody);
        // client.messages
        //     .create({
        //         body: msgBody,
        //         from: '+15145008028',
        //         to: '+15149462453'
        //     })
        //     .then(message => console.log(message + "\r\n" + message.sid));
    }
}