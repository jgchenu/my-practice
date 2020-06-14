const fs = require("fs");
const connection = require("./mysql");
const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const runSql = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, function(err, result) {
      if (err) {
        console.log("[SELECT ERROR] - ", err.message);
        return reject(err);
      }

      console.log(
        "--------------------------SELECT----------------------------"
      );
      console.log(result);
      console.log(
        "------------------------------------------------------------\n\n"
      );
      resolve(result);
    });
  });
};


exports.readFile = readFile;
exports.runSql = runSql;
