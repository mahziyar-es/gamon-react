

interface TimepickerProps {
    value?: string,
    onChange?: (value:string)=>void,
    model?: [string, (value:string)=>void],
    
    format ?: string,
    hourType ?: string,
}



export {TimepickerProps}