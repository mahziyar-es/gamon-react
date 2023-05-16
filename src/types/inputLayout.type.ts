import React, { ReactNode } from "react";

interface InputLayoutProps {
    title ?: string,
    icon ?: string,
    children?: ReactNode,

    className?: string,
    style?: { [index:string]: string},
    
    onClick ?: (e:React.MouseEvent)=>void,
}


export {InputLayoutProps}