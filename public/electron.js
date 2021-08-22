require("dotenv").config();

const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    const url = isDev ? `http://localhost:3000` : `file://${path.join(__dirname, "../build/index.html")}`;
    win.loadURL(url);

    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }
}

function onActivate() {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
}

function onAllWindowsClosed() {
    if (process.platform !== "darwin") {
        app.quit();
    }
}

app.whenReady().then(createWindow);
app.on("activate", onActivate);
app.on("window-all-closed", onAllWindowsClosed);
