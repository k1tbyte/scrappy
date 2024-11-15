import {forwardRef, type HTMLAttributes} from "react";
import {cn} from "@/lib/utils.ts";

interface ICheckBoxProps extends HTMLAttributes<HTMLButtonElement> {
    checked: boolean,
    setChecked:  React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckBox = forwardRef<HTMLButtonElement, ICheckBoxProps>(({ className,setChecked, checked, ...props }, ref) => {

    return (
        <button ref={ref} tabIndex={0} type="button"
                className={cn(
                    "rounded-md bg-background flex-center hover:text-foreground-accent focus:focus-shadow select-none cursor-pointer text-foreground text-xs transition-colors",
                    className)
                }
                style={{width: 25, height: 25, minWidth: 25, minHeight: 25}} {...props}
                onClick={() => setChecked(prev => !prev)}>
            {checked === null ? "—" : checked && "✔"}
        </button>
    )
})