import { ReactNode } from "react";
import { StyleObject } from "./general.type";

interface ScrollProps {
    children?: ReactNode,
    hideScrollbar?: boolean,
    vertical?: boolean,
    
    grabScrollClass?: string,

    grabScrollStyle?: StyleObject,
}


export {
    ScrollProps,
}