const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Client = require('sstp-client').Client;

let mainWindow;
let client;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    nodeIntegration: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('connect-vpn-server', (event, serverDetails) => {
  const {host, username, password} = serverDetails;
  client = new Client({
    host,
    username,
    password,
  });

  client
    .connect()
    .then(() => {
      event.sender.send('vpn-connected');
    })
    .catch((error) => {
      event.sender.send('vpn-connection-error', error);
    });
});

ipcMain.on('disconnect-vpn-server', () => {
  client.disconnect();
  client = null;
});
