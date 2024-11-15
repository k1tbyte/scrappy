import {ipcRenderer} from "electron";
import {Action} from "./IActionProps.ts";

export interface IApi {
    on: typeof ipcRenderer.on;
    off: typeof ipcRenderer.off;
    send: typeof ipcRenderer.send;
    invoke: typeof ipcRenderer.invoke;

    selectFile: (filters: Electron.FileFilter[], type?:  "openFile" | "openDirectory") => Promise<{ filePath: string, fileContent: string } | null>;
    saveFile: (content: string, filters: Electron.FileFilter[]) => Promise<void>;
    startParsing: (url: string, pipeline: Action[], headless?: boolean) => Promise<[string,string]>;
}