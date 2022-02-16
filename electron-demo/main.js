const { app, BrowserWindow, ipcMain, Notification } = require("electron");

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
  win.loadFile("index.html");
}

function handleIPC() {
  ipcMain.on("time-work-notification", async (event, ...args) => {
    console.log("arg", args);
  });
}

app.whenReady().then(() => {
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
