import { contextBridge } from 'electron'
import {api} from "./api.ts";

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', api)
