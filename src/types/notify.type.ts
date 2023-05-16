import { ToggleAnimations } from "./general.type";


interface NotifyPorps{
    position ?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'center',
    duration?: number,
    animation?:ToggleAnimations,
}


interface NotifyTextBoxProps {
    text:string,
    type?: 'success' | 'error' | '',
    duration:number, // if duration is -1, it means it will not fade automatically(its permanent)
    animation:ToggleAnimations,
    parentEl:HTMLElement,
}



export {
    NotifyPorps,
    NotifyTextBoxProps,
}