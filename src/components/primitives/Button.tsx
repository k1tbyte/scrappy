import {
    type ButtonHTMLAttributes,
    type Dispatch,
    forwardRef,
    type ReactNode, Ref,
    type SetStateAction,
    useImperativeHandle,
    useRef
} from "react";
import {cn} from "@/lib/utils.ts";

export const enum EButtonVariant {
    Primary,
    Outlined,
}

export const enum EButtonSize {
    Default
}

export interface IButtonActions {
    setLoading: Dispatch<SetStateAction<boolean>>
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    children: ReactNode,
    isLoading?: boolean;
    actions?: Ref<IButtonActions>;
    variant?: EButtonVariant;
    size?: EButtonSize
}

const variants = [
    "font-semibold  flex-center  bg-secondary text-accent  hover:text-foreground-accent rounded-xm",
    "border-tertiary border text-secondary font-thin hover:bg-tertiary rounded",
]

const sizes = [
    "px-3 py-1 text-2xs"
]

const Button = forwardRef<HTMLButtonElement, IButtonProps>((
    {
        className,
        children,
        actions,
        isLoading = false,
        variant = EButtonVariant.Primary,
        size = EButtonSize.Default,
        ...props}, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(ref, () => buttonRef.current!);

    return (
        <button ref={buttonRef} disabled={isLoading}
                className={cn("select-none transition-colors",variants[variant],sizes[size], className)} {...props}>

            {isLoading ?
                <svg className="animate-spin h-5 w-5 text-foreground-accent" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" fill="transparent"
                            strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                :
                children
            }
        </button>
    )
})


export default Button;