
interface InputSelectProps<T> {
    value ?: T ,
    onChange ?: (value:T)=>void,
    model ?: [T, (value:T)=>void],

    options ?: (number|string)[][],
    title ?: string,
    placeholder ?: string,
    multi ?: boolean,
    icon ?: string,
    displayType?: 'dropdown' | 'sheet-bottom' | 'sheet-center',
    
    className?: string,
    style?: {[index:string]: string},
}



export {InputSelectProps}