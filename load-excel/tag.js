const xlsx = require("xlsx");
const fs = require("fs");

// 读取 Excel 文件
const workbook = xlsx.readFile("./hashtag.xlsx");

// 获取第一个工作表
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// 解析数据并生成 JSON 对象
const jsonData = [];
const range = xlsx.utils.decode_range(worksheet["!ref"]);
for (let row = range.s.r + 1; row <= range.e.r; row++) {
  const cell1 = worksheet[xlsx.utils.encode_cell({ r: row, c: 1 })];
  const cell2 = worksheet[xlsx.utils.encode_cell({ r: row, c: 2 })];
  const cell3 = worksheet[xlsx.utils.encode_cell({ r: row, c: 3 })];

  if (cell1 && cell2 && cell3) {
    const title = cell1.v;
    const category = cell2.v;
    const tags = cell3.v;

    const data = { title, category, tags };
    jsonData.push(data);
  }
}

// 将 JSON 写入文件
const jsonContent = JSON.stringify(jsonData, null, 2);
fs.writeFileSync("tag.json", jsonContent);

console.log("JSON 文件已成功生成。");
