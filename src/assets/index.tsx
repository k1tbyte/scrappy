import {forwardRef, SVGAttributes} from "react";

export const enum Icon {
    AddPlus = 1,
    Close,
    ChevronLeft,
    ClipboardCopy,
    ClipboardCheck,
}

interface ISvgIconProps extends SVGAttributes<SVGElement>  {
    size?: number;
    className?: string;
    icon: Icon;
}

export const SvgIcon = forwardRef<SVGSVGElement, ISvgIconProps>(
    ({
         icon,
         size,
         fill,
         ...props
     }, ref
    ) => {
        return (
            <svg fill={fill ?? "currentColor"} ref={ref}
                 stroke={props.stroke ?? "currentColor"}
                 strokeWidth={0}
                 width={size ?? props.width}
                 height={size ?? props.height} {...props} >
                <use xlinkHref={`/icons.svg#i${icon}`}/>
            </svg>
        );
    });