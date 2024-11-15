import {app, BrowserWindow, dialog, ipcMain, Menu} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path'
import * as fs from 'node:fs';
import {
    type Action,
    EActionType,
    EPipeActionMethod,
    type IDelayAction,
    IRetrieveAction,
    IScrollAction
} from "./types/IActionProps.ts";

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const { Builder } =  require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
      minWidth: 880,
      minHeight: 600,
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  //win.webContents.openDevTools();
  Menu.setApplicationMenu(null)
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

async function createDriver(headless:boolean) {

    const builder = new Builder().forBrowser('chrome');
    if(headless) {
        const options = new chrome.Options();
        options.addArguments('--headless'); // Launch in headless mode
        options.addArguments('--no-sandbox'); // Bypass OS security
        options.addArguments('--disable-dev-shm-usage'); // Optimization for memory resources
        builder.setChromeOptions(options);
    }
  return builder.build();
}

async function scrollToEnd(action: IScrollAction, driver: any) {
    action.delay = Number(action.delay);
    await driver.executeScript(async (xpath: string, delay: number) => {
        const scroller = xpath ? document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
        : undefined;

        if(!delay || !(scroller instanceof HTMLElement)) {
            window.scroll(0, document.body.scrollHeight)
            return
        }


        scroller.click()
        let lastHeight = scroller.scrollHeight;

        while (true) {
            scroller.scroll(0,scroller.scrollHeight)


            await new Promise(resolve => setTimeout(resolve,delay));

            const newHeight = scroller.scrollHeight;

            if (newHeight === lastHeight) {
                break;
            }

            lastHeight = newHeight;
        }
    }, action.xpath, action.delay);
}

// @ts-ignore
ipcMain.handle('start-parsing', async (event, url, p, headless: boolean = false) => {
    const pipeline = p as Action[];
    const driver = await createDriver(headless);
    let result: any;
    let title = '';

    try {
        await driver.get(url);
        title = await driver.getTitle();
        for (let action of pipeline) {
            try {

                switch (Number(action.type)) {
                    case EActionType.Scroll:
                        await scrollToEnd(action as IScrollAction, driver);
                        break;
                    case EActionType.Delay:
                        const delay = action as IDelayAction;
                        if(!delay.until) {
                            await new Promise(resolve => setTimeout(resolve, Number(delay.delay)));
                            continue;
                        }
                        const until = "return " + delay.until;
                        await driver.wait(async () => {
                            return await driver.executeScript(until);
                        }, Number(delay.timeout) || 10000, null, Number(delay.delay));
                        break;
                    case EActionType.Retrieve:
                        const retrieve = action as IRetrieveAction;
                        const script = `return ${retrieve.query}`;
                        result = await driver.executeScript(script, result) || result;
                        break;
                    case EActionType.Script:
                        const fsPath = action.path as string;
                        const fileContent = fs.readFileSync(fsPath, 'utf-8');
                        result = await driver.executeScript(fileContent, result) || result;
                        break;
                    case EActionType.Pipe:
                        action.method = Number(action.method);
                        if(action.method === EPipeActionMethod.File) {
                            const fsPath = action.dir as string;
                            fs.writeFileSync(path.join(fsPath, action.name), JSON.stringify(result, null, 2));
                        }
                        break;

                }

            } catch (e) {
                console.error(e);
            }
        }
    } finally {
        await driver.quit();
    }

    return [JSON.stringify(result,null, 2),title];
});

// @ts-ignore
ipcMain.handle('select-file', async (event, filters, type = "openFile") => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: [type],
        filters: filters
    });

    if (canceled || filePaths.length === 0) return null;

    const filePath = filePaths[0];
    const fileContent =  type === "openFile" ? fs.readFileSync(filePath, 'utf-8') : '';
    return { filePath, fileContent };
});

// @ts-ignore
ipcMain.handle('save-file', async (event, content, filters) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
        filters: filters
    });

    if (canceled) return;

    fs.writeFileSync (filePath, content);
})

app.whenReady().then(createWindow)
