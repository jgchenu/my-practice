const puppeteer = require("puppeteer");
const _ = require("lodash");
const fs = require("fs");

// const url = "https://cs.test.shopee.sg/user/manage/account";
// const url = "https://cs.test.shopee.sg/dms/dispute/template/remark";
// const url = "https://cs.test.shopee.sg/dispute/template/email";
// const url = "https://baidu.com";
// const url = "https://help.test.shopee.sg/portal/webform/690601af068648798d5f5c4aa74b5b56";
const url = "https://cs.shopee.sg/dms/dispute/template/remark";

const pageCount = 50;
const cookies = [
  {
    name: "SPC_SCS",
    domain: ".cs.shopee.sg",
    value: "4a702bdf96814da2a4f0439c766f849f",
    path: "/",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  // {
  //   name: "_SPC_PFB",
  //   domain: ".cs.shopee.sg",
  //   value: "pfb-dms-v5-1-8",
  //   path: "/",
  //   expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
  // },
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
    return result;
  });
  return monitorData;
}

async function createTargetPageAndCalculateAverage(browser, count, url) {
  const arr = new Array(count).fill(1);
  const ans = [];
  for (const value of arr) {
    const result = await createPageAndGetPerformance(browser, url);
    ans.push(result);
  }
  const averageResult = {};
  const firstResult = ans.shift();
  const keys = Object.keys(firstResult);
  keys.forEach((key) => {
    averageResult[key] = _.meanBy(ans, (o) => o[key]);
  });
  return {
    firstResult,
    averageSecondResult: averageResult,
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
  const name = url.split("https://")[1].replace(/\./g, "-").replace(/\//g, "");
  fs.writeFileSync(`${name}.json`, JSON.stringify(result, null, 2));
  // browser.close();
}

main();
