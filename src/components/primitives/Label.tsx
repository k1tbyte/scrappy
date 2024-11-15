import {FC, forwardRef, HTMLAttributes, ReactElement} from "react";
import {cn} from "@/lib/utils.ts";

interface ILabelProps extends HTMLAttributes<HTMLDivElement> {
    className?: string,
    children: string | ReactElement<HTMLSpanElement> | ReactElement<HTMLParagraphElement>,
}

interface IInputLabelProps extends HTMLAttributes<HTMLParagraphElement> {
    children: string | ReactElement<HTMLSpanElement>,
    isRequired?: boolean,
}

export const Label = forwardRef<HTMLDivElement,ILabelProps>(({ children, className }, forwardedRef) => {
    return (
        <div ref={forwardedRef} className={cn("text-foreground text-2xs bg-primary px-3 py-1 rounded-md", className)}>
            {children}
        </div>
    )
})

export const InputLabel:FC<IInputLabelProps> = ({ children, isRequired, className }) => {
    return (
        <p className={cn("text-foreground text-2xs ml-1 mb-0.5 font-bold", className)}>
            {children}
            {isRequired && <span className="text-close"> *</span>}
        </p>
    )
}