const csv = require("csv-parser");
const fs = require("fs");

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

const download = function (data, i) {
    fs.appendFileSync(`output/output_${i}.csv`, data);
}

const csvmaker = function (data) {

    // Empty array for storing the values
    csvRows = [];

    // Headers is basically a keys of an
    // object which is id, name, and
    // profession
    const headers = ["sku"]

    // As for making csv format, headers
    // must be separated by comma and
    // pushing it into array
    csvRows.push(headers);

    // Pushing Object values into array
    // with comma separation
    data.forEach(d => {
        csvRows.push(d);
    })

    // Returning the array joining with new line
    return csvRows.join('\n')
}

const get = async function () {
    // JavaScript object
    const i = process.argv.slice(2);
    const skuT = await readCsvFile("FACL_stores_barcodes.csv");
    const skuM = await readCsvFile(`chunks/chunks_${i}.csv`);
    let y = [];
    let z = [];
    let ss = [];
    skuT.forEach((o) => {
        y.push(o.datayy);
    });
    skuM.forEach((o) => {
        let s = o['sku'];
        z.push(s);
    });
    z.forEach((s, i) => {
        if(i % 100 === 0) {
            console.log(`1000 done for ${i}`);
        }
        let t = y.find((p) => p === s);
        if (!t) {
            ss.push(s);
        }
    })
    csvdata = csvmaker(ss);
    download(csvdata, i);
}

get();