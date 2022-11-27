const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  protocol,
} = require("electron");
const path = require("path");

const PROTOCOL = "atom";
const HOST = "localhost";
const LOCATION = `${PROTOCOL}://${HOST}`;

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true,
    },
  });
  win.loadURL(LOCATION);
}

function handleIPC() {
  ipcMain.on("time-work-notification", async (event, ...args) => {
    console.log("arg", args);
  });
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);
app.whenReady().then(() => {
  protocol.registerFileProtocol(PROTOCOL, (request, callback) => {
    // TODO 关于文件目录结构及请求分发，需要重新梳理
    const [pathname] = request.url.split("?");
    const staticFileMatch = new RegExp(`${LOCATION}/(.*\\..*)`).exec(pathname);
    const staticFilePath = staticFileMatch && staticFileMatch[1];
    let filePath = "/index.html";
    if (staticFilePath) {
      filePath = `/${staticFilePath}`;
    }
    const absolutePath = path.normalize(`${app.getAppPath()}${filePath}`);
    callback({
      path: absolutePath,
    });
  });
  handleIPC();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
