const Koa = require("koa");
const path = require("path");
const Router = require("koa-router");
const { readFile, runSql } = require("./help");
const app = new Koa();
const router = new Router();

const user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4
  }
};

router.get("/listUsers", async (ctx, next) => {
  try {
    let data = await readFile(path.resolve(__dirname, "./user.json"));
    ctx.response.body = data;
    // ctx.req ， ctx.res是原生的node http.createServer 的两个方法
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/addUser", async (ctx, next) => {
  try {
    let data = await readFile(path.resolve(__dirname, "./user.json"));
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    ctx.response.body = JSON.stringify(data);
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/userInfo/:id", async (ctx, next) => {
  try {
    const id = ctx.params.id || 1;
    let data = await readFile(path.resolve(__dirname, "./user.json"));
    data = JSON.parse(data);
    data = data[`user${id}`];
    ctx.response.body = JSON.stringify(data);
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/deleteUser/:id", async (ctx, next) => {
  try {
    const id = ctx.params.id || 1;
    let data = await readFile(path.resolve(__dirname, "./user.json"));
    data = JSON.parse(data);
    delete data[`user${id}`];
    ctx.response.body = JSON.stringify(data);
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/selectSql", async (ctx, next) => {
  try {
    var sql = "SELECT * FROM websites";
    const data = await runSql(sql);
    ctx.response.body = data;
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/addSql", async (ctx, next) => {
  try {
    var addSql =
      "INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)";
    var addSqlParams = ["菜鸟工具", "https://c.runoob.com", "23453", "CN"];
    const data = await runSql(addSql, addSqlParams);
    ctx.response.body = data;
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/updateSql", async (ctx, next) => {
  try {
    var modSql = "UPDATE websites SET name = ?,url = ? WHERE Id = ?";
    var modSqlParams = ["菜鸟移动站", "https://m.runoob.com", 6];
    const data = await runSql(modSql, modSqlParams);
    ctx.response.body = data;
    await next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/deleteSql", async (ctx, next) => {
  try {
    var delSql = "DELETE FROM websites where id=6";
    const data = await runSql(delSql);
    ctx.response.body = data;
    await next();
  } catch (error) {
    console.log(error);
  }
});

app.use(router.routes());
app.listen(3000, function() {
  console.log("localhost:3000 is listening");
});
