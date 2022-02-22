import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://ca8bd70cdc5d480fab2518a6ee0b676c@o1148663.ingest.sentry.io/6220154",
  integrations: [new BrowserTracing()],
  release: VERSION,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function causeError() {
  console.log("1");
  fsdsdsds();
  console.log("2");
}
setTimeout(() => {
  causeError();
}, 3000);
