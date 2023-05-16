

interface InputToggleProps<T> {
    model?: [T, (value: T) => void],
    value ?: T,
    onChange ?: (value:T)=>void,
    
    defaultValue : (string|number)[],
    activeValue: (string | number)[],
    
    rectangle?: boolean,
    
    togglerStyle ?: {[index:string]: string},
    pointerStyle ?: {[index:string]: string},
    activeValueStyle ?: {[index:string]: string},
    defaultValueStyle ?: {[index:string]: string},

    defaultValueClass ?: string,
    activeValueClass ?: string,
    pointerClass ?: string,
    togglerClass?: string,
    
    className ?: string,
    style ?: {[index:string]: string},
}


export {InputToggleProps}