import { motion} from "framer-motion";
import React, {FC, forwardRef, Key, ReactNode, useState} from "react";
import {cn} from "@/lib/utils.ts";

interface ITabProps {
    children: ReactNode,
    title: ReactNode | ((active: boolean) => ReactNode),
}

interface ITabPanelProps {
    children: React.ReactElement<ITabProps> | React.ReactElement<ITabProps>[];
    activeKey: Key;
    className?: string;
    indicator?: ReactNode
    onActiveChanged?: (key: Key) => void;
}

export const TabPanel: FC<ITabPanelProps> = forwardRef<HTMLDivElement,ITabPanelProps> (
    ({ children, activeKey, className, indicator, onActiveChanged }, ref) => {
        const [active, setActive] = useState(activeKey)
        let renderContent: ReactNode;

        return (
            <div className="flex flex-col flex-x-center" ref={ref}>
                <div className={cn("flex-x-center mx-auto mb-5 bg-primary p-2 rounded-lg",className)}>
                    {
                        React.Children.map(children, (child) => {
                            let isActive: boolean = false;
                            if (child.key == active) {
                                renderContent = child
                                isActive = true
                            }
                            return (
                                <button type="button" key={child.key} onClick={() => {
                                    setActive(child.key!);
                                    onActiveChanged?.(child.key!)
                                }}
                                        className="relative py-1.5 text-sm text-foreground">
                                    {isActive &&
                                        (indicator ??
                                            <motion.div layoutId="active-pill" style={{borderRadius: 8}}
                                                        transition={{type: "spring", duration: 0.6}}
                                                        className="absolute inset-0 bg-secondary"/>
                                        )
                                    }
                                    <span className="relative z-10">
                                    {typeof child.props.title === 'function' ?
                                        child.props.title(isActive) : child.props.title}
                                </span>
                                </button>
                            )
                        })
                    }
                </div>

                <div className="w-full">
                    {renderContent}
                </div>
            </div>
        )
    })

export const Tab: FC<ITabProps> = ({ children}) => children