import React from "react"

type CustomClickProps = {
    onClick ?: (e: MouseEvent | TouchEvent)=>void,
    onLongClick?: (e: MouseEvent | TouchEvent) => void,
    longClickDuration?: number,

    children: React.ReactNode,

    style?: {[index:string]: string},
    className?: string,
}




export {
    CustomClickProps,
}