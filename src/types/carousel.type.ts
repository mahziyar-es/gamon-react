import { ReactNode } from "react";

interface CarouselProps {
    children ?: ReactNode,
    itemsPerView ?: number,
    itemsPerSlide ?: number,
    eachItemMargin ?: number,
    eachItemHeight ?: number,
    duration ?: number,
    auto ?: boolean,
    stopAtEnd ?: boolean,
    noIndicator ?: boolean,
    responsive?: { [index: number]: number }, // e.g  {1000: 5,  800 : 3, 200 : 1 }
    
    className ?: string,
    style ?: {[index:string]: string}
}



export {CarouselProps}