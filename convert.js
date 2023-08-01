const convertExcelToJson = async (inputFile, outputFile, sheetName) => {
    const ExcelJS = require('exceljs');
    const jsonfile = require('jsonfile');
    const workbook = new ExcelJS.Workbook();
  
    try {
      await workbook.xlsx.readFile(inputFile);
      const worksheet = workbook.getWorksheet(sheetName);
  
      const json = [];
  
      for (var row of worksheet.eachRow()) {
        const rowObject = {};
//   row.valuesObjec
// 
// console.log(row)
// console.log(Object.keys(row.entries()))
        for (const [colNumber, cell] of row.entries()) {
          rowObject[`col${colNumber + 1}`] = cell;
        }
  
        json.push(rowObject);
      }
  
      await jsonfile.writeFile(outputFile, json, { spaces: 4 });
      console.log(`JSON file saved to ${outputFile}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  module.exports = { convertExcelToJson };