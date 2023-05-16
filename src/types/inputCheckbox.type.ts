import { StyleObject } from "./general.type";


interface InputCheckboxProps<T> {
    value ?: T,
    onChange?: (val: T) => void,
    model ?: [T, (val:T)=>void]
    
    title : string|number,
    checkedValue ?: string|number,
    name ?: string,
    binary?: boolean,
    
    style ?: {[index:string]: string},
    checkmarkStyle ?: {[index:string]: string},
    titleStyle?: {[index:string]: string},
    
    className ?: string,
    titleClass ?: string,
    checkmarkClass ?: string,
}

export {InputCheckboxProps}