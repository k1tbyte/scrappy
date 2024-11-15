import {FC, useState} from "react";
import {ComboBox} from "@/components/primitives/ComboBox/ComboBox.tsx";
import Input from "@/components/primitives/Input.tsx";
import {InputLabel} from "@/components/primitives/Label.tsx";
import {EPipeActionMethod} from "../../../../electron/types/IActionProps.ts";

export const PipeAction:FC = () => {
    const [selected, setSelected] = useState<number>(0);
    const [path, setPath] = useState<string>('');

    return (
        <>
            <Input name={"method"} value={selected + 1} readOnly={true} className="hidden"/>
            <InputLabel>
                Delegate output of result to:
            </InputLabel>
            <ComboBox selectedIndex={0} items={["File", "System process", "Worker"]} onSelected={(e) => {
                setSelected(e);
            }}/>
            { selected+1 === EPipeActionMethod.File &&
                <>
                    <InputLabel className="mt-3" isRequired={true}>Name</InputLabel>
                    <Input name="name" required placeholder="Name of the file"/>
                    <InputLabel className="mt-3" isRequired={true}>Select file path</InputLabel>
                    <Input value={path} name="dir" className="cursor-pointer mb-4" required
                           placeholder="Click to select script file"
                           readOnly={true} onClick={() => {
                        api.selectFile([], "openDirectory").then((data) => {
                            if(data) setPath(data.filePath)
                        });
                    }}/>
                </>
            }
        </>
    )
}