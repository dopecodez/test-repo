const csv = require("csv-parser");
var exec = require('child_process').exec;

const readCsvFile = (fileName) =>
  new Promise((resolve) => {
    const lines = [];
    fs.createReadStream(fileName)
      .pipe(csv())
      .on("data", (data) => lines.push(data))
      .on("end", () => {
        resolve(lines);
      });
  });

function testshit() {
    for (i = 6; i < 11; i++) {
        exec(`node cmp.js ${i}`);
        console.log(`${i}th time`);
    }
}

testshit();
