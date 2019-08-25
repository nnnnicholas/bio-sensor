# bio-sensor

## Description 📚
A server that reads data from an Arduino over serial, saves data to a JSON file, and sends text alerts if the readings exceed a threshold.

## System Requirements 💽
This software is written and tested on Linux. It should work on Mac. The software reads the temperature from the serial port, which I haven't figured out how to do on Windows yet. 

## Getting Started 🙎
0. If you do not have recent versions already installed, install NodeJS and Arduino for your platform. This guide is written for Linux but should work well on Mac. I have not yet successfully gotten this working on Windows, but I intend to do so soon.
1. In the command line, clone the repo with `$ git clone https://github.com/nnnnicholas/bio-sensor.git`
2. `cd` into the directory where the repo is cloned. Install the dependencies with `npm install`
3. Create a file called `secrets.json` in the root directory. Copy-paste the following into the file, replace the capitalized placeholder text with your credentials, which can be found in the twilio.com dashboard, then save.
````
{
    "accountSid": "YOUR_ACCOUNT_SID",
    "authToken": "YOUR_AUTH_TOKEN"
}
````
4. Plug the thermistor into the Arduino. [These instructions](https://steps2make.com/2017/10/arduino-temperature-sensor-module-ky-013/) may help. Using your mouse, navigate to `/thermistor` and open `thermistor.ino` in the Arduino IDE. Plug in your Arduino, configure the Board and Port settings to match your Arduino device, then upload the program. Open the serial monitor in the Arduino IDE to see verify that it works correctly. If the sensor readings work, but the values are wildly wrong or the temperature decreases when you touch the sensor, try swapping the wires. Sometimes the manufacturer mislabels the part. For instance if the temperature goes up when you expect it to go down, you need to swap your 5V and GND wires. 
5. In the command line, at the root directory of the repo, run `$ node index.js NAME_OF_YOUR_DEVICE MINIMUM_THRESHHOLD_CELCIUS MAXIMUM_THRESHHOLD_CELCIUS`. For example, `$ node index.js /dev/ttyAMC0 15 25` will launch the program and set it to read serial data from the ttyAMC0 device. If the temperature drops below 15 degrees Celcius or above 25 degrees Celcius.