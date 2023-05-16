import { ReactNode } from "react";

interface PickerProps {
    options ?: (string|number| (string|number)[])[],
    stopAtEnd ?: boolean,
    optionSize ?: number, // height for vertical , width for horizontal
    mouseMoveRatio ?: number,
    touchMoveRatio ?: number,
    horizontal ?: boolean,
    height ?: number,
    width ?: number,
    noSelectedFrame ?: boolean,
    startCenter ?: boolean,
    getValue ?: boolean,
    arrow ?: boolean,
    children?: ReactNode,
    
    selectedFrameClass ?: string,
    optionClass?: string,
    
    selectedFrameStyle ?: {[index:string]: string},
    optionStyle?: {[index:string]: string},

    style ?: {[index:string]: string},
    className ?: string,

    value?: any,
    onChange ?: (value:any)=>void,
    model ?: [any, (value:any)=>void],
}



export {PickerProps}