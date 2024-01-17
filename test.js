const fs = require("fs");
const csv = require("csv-parser");
const { error } = require("console");

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

  const readCsvFile2 = (fileName) =>
  new Promise((resolve) => {
    const lines = [];
    fs.createReadStream(fileName)
      .pipe(csv({ separator: ';' }))
      .on("data", (data) => lines.push(data))
      .on("end", () => {
        resolve(lines);
      });
  });

const download = function (data, i) {
    fs.appendFileSync(`chunks/chunks_${i}.csv`, data);
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

  const skuT = await readCsvFile("FACL_stores_barcodes.csv");
  console.log("GCP Barcodes - ", skuT.length);

  const skuM = await readCsvFile2("Barcode_SKU/Barcode_SKU.csv");
  const skuN = await readCsvFile2("Barcode_SKU/Barcode_SKU_II.csv");
  const skuO = await readCsvFile2("Barcode_SKU/Barcode_SKU_III.csv");
  console.log("RPC Barcodes - ", skuM.length + skuN.length + skuO.length);
  const ss = [];

  let z = [];
  let y = [];
  skuT.forEach((o) => {
    y.push(o.datayy);
  });
  skuM.forEach((o) => {
    let s = o['PRD_UPC'];
    z.push(s);
  });
  skuN.forEach((o) => {
    let s = o['PRD_UPC'];
    z.push(s);
  });
  skuO.forEach((o) => {
    let s = o['PRD_UPC'];
    z.push(s);
  });
  let arrOfArr = [];
  while(z.length) {
    var s = z.splice(0,50000);
    arrOfArr.push(s);
    csvdata = csvmaker(s);
    download(csvdata, arrOfArr.length);
  }
  
//   const csvdata = csvmaker(ss);

//   download(csvdata);
};

get();