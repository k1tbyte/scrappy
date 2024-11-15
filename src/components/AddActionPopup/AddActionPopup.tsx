import { useModalActions} from "@/components/primitives/Modal.tsx";
import {FC, ReactNode, useRef} from "react";
import {Tab, TabPanel} from "@/components/primitives/Tabs.tsx";
import clsx from "clsx";
import {DelayAction} from "@/components/AddActionPopup/elements/DelayAction.tsx";
import Button from "@/components/primitives/Button.tsx";
import {ScrollAction} from "@/components/AddActionPopup/elements/ScrollAction.tsx";
import {RetrieveAction} from "@/components/AddActionPopup/elements/RetrieveAction.tsx";
import {ScriptAction} from "@/components/AddActionPopup/elements/ScriptAction.tsx";
import {Action, EActionType} from "../../../electron/types/IActionProps.ts";
import {PipeAction} from "@/components/AddActionPopup/elements/PipeAction.tsx";


const TabTitle: FC<{active: boolean, children: ReactNode}> = ({ active, children}) => {
    return (
        <div className={clsx("mx-3",active ? "text-foreground-accent" : "text-foreground")}>
            {children}
        </div>
    )
}

interface IAddActionPopupProps {
    onActionSubmit: (values: Action) => void;
}

export const AddActionPopup:FC<IAddActionPopupProps> = ({ onActionSubmit }) => {
    const active = useRef(EActionType.Delay)
    const { contentRef, closeModal} = useModalActions<HTMLFormElement>()

    return (
        <form ref={contentRef} style={{ width: "350px"}} onSubmit={(e) => {
            e.preventDefault()
            // @ts-ignore
            const formData = new FormData(e.target)
            onActionSubmit({ type: active.current, ...Object.fromEntries(formData.entries()) })
            closeModal()
        }}>
                <TabPanel className="bg-accent" onActiveChanged={(i) => active.current = i as EActionType}
                          activeKey={active.current}>
                    <Tab key={EActionType.Delay} title={(o) => <TabTitle active={o}>Delay</TabTitle> }>
                        <DelayAction/>
                    </Tab>
                    <Tab key={EActionType.Scroll} title={(o) => <TabTitle active={o}>Scroll</TabTitle> }>
                       <ScrollAction/>
                    </Tab>
                    <Tab key={EActionType.Retrieve} title={(o) => <TabTitle active={o}>Retrieve</TabTitle> }>
                        <RetrieveAction/>
                    </Tab>
                    <Tab key={EActionType.Script} title={(o) => <TabTitle active={o}>Script</TabTitle> }>
                        <ScriptAction/>
                    </Tab>
                    <Tab key={EActionType.Pipe} title={(o) => <TabTitle active={o}>Pipe</TabTitle> }>
                        <PipeAction/>
                    </Tab>


                </TabPanel>

            <Button className="mx-auto mt-6 min-w-32">
                Add to list
            </Button>

        </form>
    )
}