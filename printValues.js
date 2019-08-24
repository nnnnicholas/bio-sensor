var SerialPort = require('serialport'); // include the library
// get port name from the command line:
const portName = process.argv[2];

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
}

function showPortClose() {
    console.log('port closed.');
}

function showError(error) {
    console.log('Serial port error: ' + error);
}