export const enum EActionType {
    None,
    Delay = 1,
    Scroll,
    Retrieve,
    Script,
    Pipe
}

export const enum EPipeActionMethod {
    None,
    File,
    SystemProcess,
    Worker
}

export const PipeActionMethods = [
    "File",
    "System process",
    "Worker"
]

export interface Action {
    type: EActionType,
    [key: string]: any;
}


export interface IAddActionPopupProps {
    onActionSubmit: (values: Action) => void;
}

export interface IDelayAction extends Action {
    delay: number;
    until?: string;
    timeout?: number;
}

export interface IScrollAction extends Action {
    xpath: string;
    delay?: number;
}

export interface IRetrieveAction extends Action {
    query: string;
}

export interface IPipeAction extends Action {
    method: EPipeActionMethod;
    name?: string;
    path?: string;
}