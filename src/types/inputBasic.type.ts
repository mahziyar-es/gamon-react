
interface InputBasicProps<T> {
    onChange?:(value:T)=>void,
    value?:T,
    model?: [T, (value: T) => void],
    
    title ?: string,
    placeholder ?: string,
    required ?: boolean,
    readOnly?: boolean,
    autoFocus ?: boolean, // used for autofocus html input attribute
    focus ?: boolean, // used to control focus on input via javascript
    delay ?: number|boolean,
    type ?: "text" | "number" | "tel" | "email" | "password",
    icon ?: string,
    passwordVisibilityToggler?: boolean,
    
    className?: string,
    style?: {[index:string]: string},
}


export {InputBasicProps}