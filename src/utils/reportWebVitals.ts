import { ReportHandler } from "web-vitals";

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export function initWebVitals(): void {
  if (process.env.NODE_ENV === "development") {
    reportWebVitals(console.log);
    return;
  }

  const analyticsUrl = process.env.REACT_APP_ANALYTICS_URL;
  if (analyticsUrl) {
    reportWebVitals(metric => {
      navigator.sendBeacon(analyticsUrl, JSON.stringify(metric));
    });
  }
}

export default reportWebVitals;
