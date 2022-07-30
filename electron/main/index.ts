import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import { release } from 'os'
import { join } from 'path'
import * as path from "path";

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    width: 1200,
    height: 768,
    minHeight: 400,
    maxHeight: 800,
    minWidth: 400,
    maxWidth: 1500,
    icon: join(ROOT_PATH.public, 'favicon.svg'),
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.setAboutPanelOptions({
  applicationName: 'Alvama GUI',
  applicationVersion: '1.0.0',
  version: '1',
  copyright: 'Copyright © 2022 Felipe Valencia & Carlos Marin. All rights reserved.',
  website: 'https://alvama.co',
});

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})

ipcMain.on('file-request', (event, formats) => {
  // If the platform is 'win32' or 'Linux'
  if (process.platform !== 'darwin') {
    // Resolves to a Promise<Object>
    dialog.showOpenDialog({
      title: 'Select the File to be uploaded',
      defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: 'Upload',
      // Restricting the user to only Text Files.
      filters: [
        {
          name: 'Text Files',
          extensions: formats,
        }, ],
      // Specifying the File Selector Property
      properties: ['openFile']
    }).then(file => {
      // Stating whether dialog operation was
      // cancelled or not.
      console.log(file.canceled);
      if (!file.canceled) {
        const filepath = file.filePaths[0].toString();
        event.reply('file', filepath);
      }
    }).catch(err => {
      console.log(err)
    });
  }
  else {
    // If the platform is 'darwin' (macOS)
    dialog.showOpenDialog({
      title: 'Select the File to be uploaded',
      defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: 'Upload',
      filters: [
        {
          name: 'Text Files',
          extensions: formats,
        },
      ],
      properties: ['openFile', 'openDirectory']
    }).then(file => {

      if (file.canceled) {
        return;
      }

        const filepath = file.filePaths[0].toString();
        event.sender.send('file', filepath);
    }).catch(err => {
      console.log(err)
    });
  }
});
