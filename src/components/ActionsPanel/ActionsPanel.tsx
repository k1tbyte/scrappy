import {Label} from "@/components/primitives/Label.tsx";
import Button, {EButtonVariant} from "@/components/primitives/Button.tsx";
import {Icon, SvgIcon} from "@/assets";
import {FC, useState} from "react";
import clsx from "clsx";
import {AddActionPopup} from "@/components/AddActionPopup/AddActionPopup.tsx";
import {modal} from "@/components/primitives/Modal.tsx";
import {Action, EActionType, PipeActionMethods} from "../../../electron/types/IActionProps.ts";
import styles from "./ActionsPanel.module.css"

const actionNames = {
    [EActionType.Delay]: "Delay",
    [EActionType.Scroll]: "Scroll",
    [EActionType.Retrieve]: "Retrieve",
    [EActionType.Script]: "Script",
    [EActionType.Pipe]: "Pipe",
}

export let pipeline: Action[] = [];

interface IActionCardProps {
    action: Action;
    onDelete: () => void;
    collection: Action[];
    setCollection: (collection: Action[]) => void;
    index: number;
}

const ActionCard: FC<IActionCardProps> = ({ action, onDelete,collection, index, setCollection }) => {
    const [expanded, setExpanded] = useState(false);

    const move = (up: boolean) => {

        const newIndex = index + (up ? -1 : 1);

        const newCollection = [...collection];
        newCollection[index] = collection[newIndex];
        newCollection[newIndex] = collection[index];

        setCollection(newCollection);
    }

    return (
        <div
            className={clsx("backdrop-primary rounded overflow-clip px-3 py-2", { "max-h-[35px]": !expanded })}>
            <div className="flex-y-center justify-between mb-2">
                <div className="flex">
                    <div className="mr-3 flex-col flex-x-center">
                        { collection[index-1] &&
                            <SvgIcon icon={Icon.ChevronLeft} size={10}
                                     onClick={() => move(true)}
                                     className={clsx("rotate-90", styles.chevron)}/>}
                        { collection[index+1] &&
                            <SvgIcon icon={Icon.ChevronLeft} size={10}
                                        onClick={() => move(false)}
                                     className={clsx("-rotate-90", styles.chevron)}/>}
                    </div>
                    <p className="text-sm text-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                        {actionNames[action.type]}
                    </p>
                </div>


                <div className="flex-center">

                    <button className={clsx("text-foreground", {"-rotate-90": expanded})}
                            onClick={() => setExpanded(prev => !prev)}>
                        <SvgIcon icon={Icon.ChevronLeft} size={16}/>
                    </button>
                </div>
            </div>

            <div className="text-xs text-foreground/50">
                { Object.keys(action).map((key) => {
                    let value = action[key];
                    if(key === 'type' || value === undefined || value === null || value === '') {
                        return;
                    }

                    if(key === 'method') {
                        value = PipeActionMethods[Number(value) - 1];
                    }

                    const readableKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());

                    return (
                        <p key={key}>{readableKey}: {value}</p>
                    )
                })}
            </div>

            <div className="w-full flex justify-end">
                <Button variant={EButtonVariant.Outlined}
                        onClick={onDelete}
                        className="mt-3 py-0.5 border-danger hover:bg-danger text-danger hover:text-foreground-accent">
                    Remove
                </Button>
            </div>

        </div>
    )
}

export const ActionsPanel = () => {
    const [actions, setActions] = useState<Action[]>([]);
    pipeline = actions;

    const handleAdd = () => {
        modal.open({
            title: "Adding new action",
            body:<AddActionPopup onActionSubmit={(action) => {
                setActions([...actions, action]);
            }}/>
        })
    }

    const handleImport = () => {
        api.selectFile([
            { name: 'JSON', extensions: ['json'] },
        ]).then((data) => {
            if (data) {
                setActions(JSON.parse(data.fileContent));
            }
        });
    }

    const handleExport = () => {
        api.saveFile(JSON.stringify(actions), [
            { name: 'JSON', extensions: ['json'] },
        ]);
    }

    return (
        <div className="min-w-80 w-80 border-r border-border flex flex-col justify-between h-full p-5">
            <div>
                <div className="flex justify-between">
                    <Label className="text-lg font-bold letter-space">Actions pipeline</Label>
                    <Button className="rounded-lg min-w-10" onClick={handleAdd}>
                        <SvgIcon icon={Icon.AddPlus} size={20}/>
                    </Button>
                </div>
                <div className="flex flex-col mt-5 gap-3">
                    {actions.map((action, index) => (
                        <ActionCard collection={actions} setCollection={setActions} index={index}
                                    key={Math.random()} action={action as Action} onDelete={() => {
                            setActions(actions.filter((_, i) => i !== index));
                        }}/>
                    ))}
                </div>
            </div>
            <div className="flex justify-between">
                {actions.length > 0 &&
                    <Button variant={EButtonVariant.Primary} onClick={handleExport}>
                        Export pipeline
                    </Button>
                }

                <Button variant={EButtonVariant.Primary} onClick={handleImport}>
                    Import pipeline
                </Button>
            </div>

        </div>
    )
}