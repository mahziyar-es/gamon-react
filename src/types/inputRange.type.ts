import { StyleObject } from "./general.type";

interface InputRangeProps<T> {
    value?: T,
    onChange?: (value: T) => void,
    model ?: [T, (value:T)=>void]
    
    min ?: number,
    max ?: number,
    step ?: number,
    double ?: boolean,
    outputDisplay ?: 'none' | 'up',

    outputOneStyle ?: {[index: string]: string},
    outputTwoStyle ?: {[index: string]: string},
    fullRangeStyle ?: {[index: string]: string},
    selectedRangeStyle ?: {[index: string]: string},
    inputOneStyle ?: {[index: string]: string},
    inputTwoStyle ?: {[index: string]: string},

    outputOneClass ?: string,
    outputTwoClass ?: string,
    fullRangeClass ?: string,
    selectedRangeClass ?: string,
    inputOneClass ?: string,
    inputTwoClass?: string,
    
    className ?: string,
    style ?: {[index: string]: string},

}



export {InputRangeProps}
