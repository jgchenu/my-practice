const timing =
  performance.getEntriesByType("navigation")[0] || performance.timing;
const entries = performance.getEntries();

const root = document.querySelector("#root");

const element = document.createElement("div");

const TTFB = timing.responseEnd - timing.requestStart;
const TTI = timing.domInteractive - timing.requestStart;

const domReady = timing.domContentLoadedEventStart - timing.domInteractive;

const load = timing.loadEventStart - timing.domContentLoadedEventEnd;

element.innerHTML = `
<p>TTFB: ${TTFB}ms</p>
<p>TTI: ${TTI}ms</p>
<p>domReady: ${domReady}ms</p>
<p>load: ${load}ms</p>
`;
// root.append(element);
console.log("timing", timing);
console.log("entries", entries);
