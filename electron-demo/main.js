const { app, BrowserWindow, ipcMain, Notification } = require("electron");

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");
  handleIPC();
  // win.webContents.openDevTools();
}

function handleIPC() {
  ipcMain.handle("time-work-notification", async (action) => {
    const notification = new Notification();
    notification.on("action", () => {});
    notification.on("close", () => {});
  });
}

app.whenReady().then(createWindow);

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
