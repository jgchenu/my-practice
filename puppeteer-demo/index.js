const puppeteer = require("puppeteer");
const _ = require("lodash");
const fs = require("fs");

async function createPageAndGetPerformance(browser, url) {
  const page = await browser.newPage();
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
      ready: ["domContentLoadedEventEnd", "fetchStart"], // 	DOM Ready耗时，白屏时间
      load: ["loadEventEnd", "fetchStart"], //	页面完全加载时间
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
    // getData.resourceList = JSON.stringify(performance.getEntries());
    return result;
  });
  return monitorData;
}

async function createTargetPageAndCalculateAverage(browser, count, url) {
  const arr = new Array(count).fill(1);
  const tasks = arr.map((_item, index) => {
    return createPageAndGetPerformance(browser, url);
  });
  const ans = await Promise.all(tasks);
  const averageResult = {};
  const keys = Object.keys(ans[0]);
  keys.forEach((key) => {
    averageResult[key] = _.meanBy(ans, (o) => o[key]);
  });
  return {
    averageResult: averageResult,
    allResult: ans,
  };
}

const url = "https://www.myquant.cn/";
// "https://juejin.im"
async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--no-first-run"],
  });
  const result = await createTargetPageAndCalculateAverage(browser, 4, url);

  console.log("performances average", result);
  const name = url.split("https://")[1].replace(/\./g, "-").replace("/", "");
  fs.writeFileSync(`${name}.json`, JSON.stringify(result, null, 2));
  browser.close();
}

main();
