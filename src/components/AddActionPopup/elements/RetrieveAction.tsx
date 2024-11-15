import {InputLabel} from "@/components/primitives/Label.tsx";
import Input from "@/components/primitives/Input.tsx";
import {CodeArea} from "@/components/primitives/CodeArea.tsx";
import {FC} from "react";



export const RetrieveAction: FC = () => {
    return (
        <div className="flex-x-center flex-col">
            <InputLabel isRequired={true}>Query script</InputLabel>
            <Input required name="query" placeholder="document.querySelectorAll('img')" className="w-full mb-3"/>
            <CodeArea title="Get text inside span by specific attribute" code={`document.querySelector(
    'span[data-my-attr="value"]'
).textContent`}/>
            <div className="my-3"/>
            <CodeArea title="All elements matching a CSS selector"
                      code={`Array.from(
    document.querySelectorAll(
        '.some-class'
    )
).map(el => el.textContent)`}/>
        </div>
    )
}