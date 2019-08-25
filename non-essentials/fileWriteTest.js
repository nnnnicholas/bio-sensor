var date = new Date();

const fs = require('fs'); // import file system
var log1 = {
    "date": new Date(),
    "data": 20
};
var log2 = new Object();
log2.date = new Date();
log2.data = 21;

var array = [];
array.push(log1, log2);

fs.writeFile('test.json', JSON.stringify(array), (err) => {
    if (err) throw err;
});