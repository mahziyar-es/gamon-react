
interface InputTextareaProps<T> {
    value ?: T,
    onChange ?: (value :T) => void,
    model ?: [T , (value:T)=>void]

    title ?: string,
    placeholder ?: string,
    cols ?: number,
    rows ?: number,
    required ?: boolean,
    readOnly?: boolean,
    autoFocus ?: boolean, // used for autofocus html input attribute
    focus ?: boolean, // used to control focus on input via javascript
    icon?: string,
    
    className?: string,
    style?: {[index:string]: string},
}


export {InputTextareaProps}