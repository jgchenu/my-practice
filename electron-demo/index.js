const { ipcRenderer } = require("electron");

ipcRenderer.send("time-work-notification", "test1", "test2");
