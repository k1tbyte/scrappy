import {InputLabel} from "@/components/primitives/Label.tsx";
import Input from "@/components/primitives/Input.tsx";
import {CheckBox} from "@/components/primitives/CheckBox.tsx";
import {FC, useState} from "react";


export const ScrollAction: FC = () => {
    const [endlessScroll, setEndlessScroll] = useState(false);

    return (
        <div>
            <InputLabel>
                <span>
                    Scrollable area XPATH
                    <br/>
                    <span className="text-foreground/50 font-medium text-xs">
                        (leave blank for document scroller)
                    </span>
                </span>
            </InputLabel>
            <Input name="xpath" placeholder="/html/body/div[1]/div[1]/div/div/div/nav/div[2]" min={100} max={10000}
                   className="w-full mb-3"/>

            <div className="w-full justify-between flex-y-center mb-3">
                <InputLabel>
                    <span>
                        Endless scrolling
                        <br/>
                        <span className="text-foreground/50 font-medium text-xs">
                            (scroll while height changes)
                        </span>
                    </span></InputLabel>
                <CheckBox  checked={endlessScroll} setChecked={setEndlessScroll}/>
            </div>
            { endlessScroll &&
                <>
                    <InputLabel isRequired={true}>Delay between scroll</InputLabel>
                    <Input name="delay" required type="number" placeholder="100 - 10000 ms" min={100} max={10000} className="w-full mb-3"/>
                </>
            }
        </div>
    )
}