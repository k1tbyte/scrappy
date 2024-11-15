import {CSSProperties, type FC, ReactElement, type ReactNode, useState} from "react";
import { motion } from "framer-motion";
import styles from "./ComboBox.module.css";
import {clsx} from "clsx";
import {Icon, SvgIcon} from "@/assets";

interface IComboBoxProps {
    items: ReactNode[];
    // return true to prevent default selection
    onSelected: (index: number) => true | void;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    selectedIndex?: number;
}


export const ComboBox: FC<IComboBoxProps> = ({ onSelected, items, placeholder, style, selectedIndex = -1, className }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(selectedIndex)

    const onSelection = (i: number) => {
        if(!onSelected(i)) {
            setSelected(i)
        }
    }

    return (
        <div className={clsx("bg-accent select-none relative text-foreground",isOpen ? "rounded-t" : "rounded", className)}>
            <div className={styles.header} style={style}
                 onClick={() => {
                     setIsOpen(prev => {
                         if (!prev) {
                             setTimeout(() => document.addEventListener("click", () => setIsOpen(false), {once: true}), 50);
                         }
                         return !prev;
                     })
                 }}>
                <div className="flex flex-y-center">
                    <small className="mt-0.5">
                        {selected === -1 ?
                            placeholder && <span className="text-foreground-muted">{placeholder}</span> :
                            <b>{items[selected]}</b>}
                    </small>
                </div>

                <SvgIcon size={10} icon={Icon.ChevronLeft}
                         className={`ml-3 transition-transform${isOpen ? " -rotate-90" : ""}`}/>
            </div>

            {
                isOpen &&
                <motion.div initial={{opacity: 0, height: 0}}
                            animate={{opacity: 0.95, height: "auto"}}
                            transition={{duration: 0.2}}
                            className={styles.dropDown}>
                    <ul className={styles.dropList}>
                        {
                            // @ts-ignore
                            items.map((child: ReactElement, i) => {
                                const isDisabled = child.props?.["aria-disabled"];
                                const click = isDisabled ? null : (() => onSelection(i))

                                return i === selected ? null :
                                    <li key={i}
                                        // @ts-ignore
                                        style={isDisabled ?  {pointerEvents: "none"} : null}
                                        // @ts-ignore
                                        className={styles.listItem} onClick={click}>
                                        {child}
                                    </li>
                            })
                        }
                    </ul>
                </motion.div>
            }
        </div>
    )
}