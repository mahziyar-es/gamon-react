import { StyleObject } from "./general.type";

interface StepperProps  {
    onChange ?: (value:number)=>void,
    value?: number,
    model?:[number, (value:number)=>void]
    
    min ?: number,
    max ?: number,
    editable ?: boolean,
    vertical ?: boolean,
    chevron ?: boolean,
    width ?: number|string,
    height?: number | string,
    
    incStyle ?: {[index:string]: string},
    decStyle ?: {[index:string]: string},
    numberStyle?: {[index:string]: string},
    
    incClass ?: string,
    decClass ?: string,
    numberClass?: string,

    style ?: {[index:string]: string},
    className?: string,

}


export {
    StepperProps,
}