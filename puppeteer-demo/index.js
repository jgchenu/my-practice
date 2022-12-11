// 参考 https://zhoujingchao.github.io/node/puppeteer/performance.html
// 参考 https://www.gunhawk.icu/article/29
// 使用性能分析时, 不能使用headless模式, 否则录制效果会不准确
const puppeteer = require("puppeteer");
const _ = require("lodash");
const fs = require("fs");

const url = "http://127.0.0.1:8080/";

const pageCount = 10;
const cookies = [
  {
    name: "session-cookie",
    domain: "juejin.im",
    value: "xxx",
    path: "/",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
];

async function createPageAndGetPerformance(browser, url) {
  const page = await browser.newPage();
  await Promise.all(
    cookies.map(async (cookie) => {
      await page.setCookie(cookie);
    })
  );
  await page.goto(url, {
    waitUntil: ["load"],
  });
  const monitorData = await page.evaluate(async () => {
    const attributes = {
      cache: ["domainLookupStart", "fetchStart"], // 读取缓存时间
      dns: ["domainLookupEnd", "domainLookupStart"], // DNS 解析耗时
      tcp: ["connectEnd", "connectStart"], // TCP 连接耗时
      req: ["responseStart", "requestStart"], // 网络请求耗时
      res: ["responseEnd", "responseStart"], // 数据传输耗时
      dom: ["domContentLoadedEventStart", "domLoading"], // DOM 解析耗时
      readycb: ["domContentLoadedEventEnd", "domContentLoadedEventStart"], // domContentLoaded回调函数耗时
      fasrt: ["domComplete", "domContentLoadedEventEnd"], // 首屏异步资源加载耗时，即domContentLoaded和load之间加载的资源，一般为图片加载，JS异步加载的资源
      loadcb: ["loadEventEnd", "loadEventStart"], // load回调函数耗时
      ready: ["domContentLoadedEventEnd", "fetchStart"], //   DOM Ready耗时，白屏时间
      load: ["loadEventEnd", "fetchStart"], //  页面完全加载时间
    };
    const result = {};
    const performance =
      window.performance || window.msPerformance || window.webkitPerformance;
    if (!performance) {
      return null;
    }
    const timing =
      performance.getEntriesByType("navigation")[0] || performance.timing;
    Object.keys(attributes).map((item) => {
      const firstParams = timing[attributes[item][0]];
      const secondParams = timing[attributes[item][1]];
      const value = Math.round(firstParams - secondParams);
      value >= 0 && value < 36e5 && (result[item] = value);
    });
    return result;
  });
  return monitorData;
}

async function createTargetPageAndCalculateAverage(browser, count, url) {
  const arr = new Array(count).fill(1);
  const ans = [];
  for (const value of arr) {
    const resultOneCase = await createPageAndGetPerformance(browser, url);
    ans.push(resultOneCase);
  }

  const averageResult = {};
  const firstResult = ans.shift();
  const keys = Object.keys(firstResult);
  keys.forEach((key) => {
    averageResult[key] = _.meanBy(ans, (o) => o[key]);
  });
  return {
    averageSecondResult: averageResult,
    firstResult,
    allResult: ans,
  };
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--single-process",
    ],
  });
  const result = await createTargetPageAndCalculateAverage(
    browser,
    pageCount,
    url
  );

  console.log("performances average", result);
  const name = url
    .replace(/https?:\/\//, "")
    .replace(/\./g, "-")
    .replace(/\//g, "");
  fs.writeFileSync(`${name}.json`, JSON.stringify(result, null, 2));
  browser.close();
}

main();
