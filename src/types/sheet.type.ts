import { ReactNode } from "react";
import { ToggleAnimations } from "./general.type";


interface SheetProps {
    displayModel?: [boolean, (display: boolean) => void],
    
    children?:ReactNode,
    id?:string,
    type?:'center' | 'bottom' | 'top' | 'left' | 'right',
    width?:string | number,
    height?:string | number,
    minHeight?:string | number,
    animation?:ToggleAnimations,
    title?:string,
    dismissDisabled?: boolean,
    noHeader?:boolean,
    
    onBackdropClick?: () => void
    onDismiss?:()=>void,
    onDisplay?: () => void,
    
    bodyStyle?: {[index:string]: string},
    backdropStyle?: {[index:string]: string},
    
    bodyClass?:string,
    backdropClass?: string,

    className?: string,
    style?: {[index:string]: string},
}



export {
    SheetProps,
}