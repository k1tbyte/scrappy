import SyntaxHighlighter from "react-syntax-highlighter";
import {shadesOfPurple} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {FC} from "react";
import {CopyButton} from "@/components/elements/CopyButton.tsx";
import {cn} from "@/lib/utils.ts";

interface ICodeAreaProps {
    code: string;
    title?: string;
    fontSize?: number;
    maxHeight?: number;
    className?: string;
}

export const CodeArea: FC<ICodeAreaProps> = ({ code, title, fontSize, maxHeight, className }) => {
    return (
        <div className={cn("flex flex-col max-w-full max-h-full",className)}>
            <div className="flex-y-center justify-between bg-secondary rounded-t-lg px-2 py-1">
                <span className="text-foreground-accent/85 font-thin font-mono text-xs">{title}</span>
                <CopyButton size={15}  copyText={code}/>
            </div>
            <SyntaxHighlighter customStyle={{
                borderRadius: "0 0 10px 10px",
                scrollbarWidth: "none",
                fontSize: `${fontSize}px`,
                padding: "5px 5px 5px 10px",
                maxHeight: `${maxHeight}px`,
            }}
                               language="javascript" style={shadesOfPurple}>
                {code}
            </SyntaxHighlighter>
        </div>
    )
}