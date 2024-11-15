import { forwardRef, type InputHTMLAttributes, type CompositionEvent } from "react";
import {cn} from "@/lib/utils.ts";


export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    filter?: RegExp,
}


const  Input = forwardRef<HTMLInputElement, IInputProps>((
    { className, filter, ...props}, forwardedRef) => {


    return (
        <input type="text" ref={forwardedRef} {...props}
               onBeforeInput={filter ? (e: CompositionEvent<HTMLInputElement>) => {
                   if(!filter.test(e.data)) {
                       e.preventDefault()
                   }
               } : undefined}
               className={cn("w-full placeholder-foreground-muted px-2.5 outline-0 outline-none rounded-md text-foreground text-2xs focus:placeholder:opacity-50 placeholder:duration-300 placeholder:transition-opacity bg-accent h-[35px]", className)}/>
    )
})

export default Input;