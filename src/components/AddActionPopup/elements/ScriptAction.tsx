import {FC, useState} from "react";
import Input from "@/components/primitives/Input.tsx";
import {InputLabel} from "@/components/primitives/Label.tsx";
import {CodeArea} from "@/components/primitives/CodeArea.tsx";

export const ScriptAction: FC = () => {
    const [path,setPath] = useState<string>('');
    const [code,setCode] = useState<string>('');

    const name = path?.split('\\')?.pop()?.split('/')?.pop() ?? "";

    return (
        <>
            <InputLabel className="max-w-80 overflow-hidden overflow-ellipsis text-nowrap" isRequired={true}>{name || "Script file"}</InputLabel>
            <Input value={path} name="path" className="cursor-pointer mb-4" required
                   placeholder="Click to select script file"
                   readOnly={true} onClick={() => {
                api.selectFile([
                    { name: 'Java Script', extensions: ['js'] },
                ]).then((data) => {
                    if (data) {
                        setPath(data.filePath);
                        setCode(data.fileContent);
                    }
                });
            }}/>

            { code &&
                <CodeArea code={code} title={`Selected ${name}`} fontSize={11} maxHeight={400}/>
            }
        </>
    )
}