import Input from "@/components/primitives/Input.tsx";
import Button from "@/components/primitives/Button.tsx";
import {useState} from "react";
import {Loader} from "@/components/primitives/Loader.tsx";
import {CodeArea} from "@/components/primitives/CodeArea.tsx";
import {pipeline} from "@/components/ActionsPanel/ActionsPanel.tsx";
import {CheckBox} from "@/components/primitives/CheckBox.tsx";
import {InputLabel} from "@/components/primitives/Label.tsx";

export const ScraperView = () => {
    const [parsing, setParsing] = useState<boolean>(false);
    const [data, setData] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [headless, setHeadless] = useState<boolean>(false);

    const onParse = () => {
        if(!url || !pipeline.length) return;
        setParsing(true);
        api.startParsing(url, pipeline, headless).then(([data, title]) => {
            setParsing(false);
            setTitle(title);
            setData(data);
        })
    }

    return (
        <div className="w-full p-5 ">
            <div className="flex gap-3 mb-5">
                <Input placeholder="Website page URL" onInput={(e) => {
                    // @ts-ignore
                    setUrl(e.target.value);
                }}/>
                <Button className="w-72" onClick={onParse} isLoading={parsing}>
                    Start parsing
                </Button>
                <div className="bg-accent text-nowrap px-3 py-1.5 rounded-md flex-center">
                    <InputLabel className="mr-3">
                        Headless mode
                    </InputLabel>
                    <CheckBox  checked={headless} setChecked={setHeadless}/>
                </div>

            </div>

            { data ?
                <CodeArea className="pb-14" code={data} title={title}/>
                :
                <div className="w-full h-full flex-center text-foreground-muted">
                    {

                        !url ? <div className="text-danger">Please enter URL</div> :
                            parsing ? <Loader/> : "Parsed data will be here"
                    }
                </div>

            }


        </div>
    )
}