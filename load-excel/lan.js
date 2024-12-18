const xlsx = require("xlsx");
const fs = require("fs");

// 读取 Excel 文件
const workbook = xlsx.readFile("./多语种文档.xlsx");

// 获取第一个工作表
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// 解析数据并生成 JSON 对象

const range = xlsx.utils.decode_range(worksheet["!ref"]);

const languages = [];
for (let col = range.s.c + 2; col <= range.e.c; col++) {
  const cell = worksheet[xlsx.utils.encode_cell({ r: range.s.r, c: col })];

  if (!cell) {
    continue;
  }
  const lan = cell.v.split("-")[1];
  if (!lan) {
    continue;
  }

  const jsonData = {};
  jsonData["@@locale"] = lan;

  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    const cell2 = worksheet[xlsx.utils.encode_cell({ r: row, c: 1 })];
    const cell3 = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];

    if (cell2 && cell3) {
      const key = cell2.v;
      const value = cell3.v;
      jsonData[key] = value;
    }
  }
  // 将 JSON 写入文件
  const jsonContent = JSON.stringify(jsonData, null, 2);
  fs.writeFileSync(`./l10n/app_${lan}.arb`, jsonContent);
  // console.log(lan, "JSON 对象已成功生成。");
  // 判断/Users/jgchen/Desktop/follower_tracking_app/lib/l10n 是否存在，重新写入
  if (!fs.existsSync("/Users/jgchen/Desktop/ins_follower/follower_tracking_app/lib/l10n")) {
    fs.mkdirSync("/Users/jgchen/Desktop/ins_follower/follower_tracking_app/lib/l10n");
  }
  fs.writeFileSync(
    `/Users/jgchen/Desktop/ins_follower/follower_tracking_app/lib/l10n/app_${lan}.arb`,
    jsonContent
  );
  console.log(lan, "目标仓库: JSON 对象已成功生成。");
}
