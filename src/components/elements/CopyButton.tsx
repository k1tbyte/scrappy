import {Icon, SvgIcon} from "@/assets";
import {ButtonHTMLAttributes, FC, useState} from "react";

interface ICopyButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
    size?: number;
    copyText?: string;
}

export const CopyButton:FC<ICopyButtonProps> = ({ size, copyText, ...props}, ) => {
    const [isCopied, setIsCopied] = useState(false)

    return (
        <button type="button" className="text-background" {...props} onClick={async () => {
            if(isCopied) return;
            await navigator.clipboard.writeText(copyText ?? "")
            setIsCopied(true)
            window.setTimeout(() => setIsCopied(false), 2000)
        }}>
            <SvgIcon icon={isCopied ? Icon.ClipboardCheck : Icon.ClipboardCopy} size={size ?? 18}/>
        </button>
    )
}