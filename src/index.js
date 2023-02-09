const { ipcRenderer } = require('electron');

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const host = document.querySelector('#host').value;
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  ipcRenderer.send('connect-vpn-server', { host, username, password });
});

ipcRenderer.on('vpn-server-status', (event, status) => {
  const statusDiv = document.querySelector('#status');
  statusDiv.innerHTML = status;
});

document.querySelector('#start-stop-button').addEventListener('click', () => {
  ipcRenderer.send('start-stop-vpn');
});
