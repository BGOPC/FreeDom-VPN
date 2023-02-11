const { ipcMain } = require('electron');
const fs = require('fs');

const VPN_LOG_FOLDER = `${app.getPath('appData')}/VPN_Client/logs`;
const VPN_SERVER_INFO_FILE = `${app.getPath('appData')}/VPN_Client/server_info.json`;

ipcMain.on('connect-vpn-server', (event, serverDetails) => {
  // Connect to VPN server
  console.log(`Connecting to VPN server: ${serverDetails.host}`);

  // Save server details to file
  fs.writeFileSync(VPN_SERVER_INFO_FILE, JSON.stringify(serverDetails));

  // Send 'vpn-connected' event to renderer process
  event.sender.send('vpn-connected');
});

ipcMain.on('disconnect-vpn-server', () => {
  // Disconnect from VPN server
  console.log('Disconnecting from VPN server');

  // Delete server info file
  fs.unlinkSync(VPN_SERVER_INFO_FILE);
});