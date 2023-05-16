import { StyleObject } from "./general.type";

interface InputRadioProps<T> {
    value ?: T,
    onChange ?: (value:T)=>void,
    model ?: [T, (value:T)=>void],
    
    title : string|number,
    checkedValue : string|number,
    name?: string,
    
    style ?: {[index:string] : string},
    checkmarkStyle ?: {[index:string] : string},
    titleStyle?: {[index:string] : string},
    
    className ?: string,
    titleClass ?: string,
    checkmarkClass ?: string,
}


export {InputRadioProps}