import Input from "@/components/primitives/Input.tsx";
import {InputLabel} from "@/components/primitives/Label.tsx";
import {useState} from "react";

export const DelayAction = () => {
    const [until, setUntil] = useState<string>('');

    return (
        <div>
            <InputLabel isRequired={true}>Waiting time</InputLabel>
            <Input name="delay" required type="number" placeholder="100 - 10000 ms" min={100} max={10000} className="w-full mb-3"/>

            <InputLabel>Waiting until</InputLabel>
            <Input onInput={e => {
                // @ts-ignore
                setUntil(e.target.value)
            }} name="until" placeholder="document.getElementById(id) === undefined" className="w-full mb-3"/>

            { until &&
                <>
                    <InputLabel>Timeout</InputLabel>
                    <Input name="timeout" required type="number" placeholder="10000 - 60000 ms" min={10000} max={60000} className="w-full mb-3"/>
                </>
            }
        </div>
    )
}