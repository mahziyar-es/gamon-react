
type PreviewSize = {
    width ?:number|string,
    height ?:number|string,
    maxWidth ?:number|string,
    maxHeight ?:number|string,
}

type FinalOutputSingle = string|File
type FinalOutputMulti = (string|File)[]

interface InputFileProps<T> {
    value?: T,
    onChange?: (value: T) => void,
    model ?: [T, (value:T)=>void]
    

    title ?: string,
    placeholder?: string,
    icon ?: string,
    required ?: boolean,
    accept ?: string,
    video ?: boolean,
    audio ?: boolean,
    image ?: boolean,
    preview ?: boolean,
    multi ?: boolean,
    maxSize ?: number,
    dragDrop ?: boolean,
    cropper ?: boolean,
    previewSize?: PreviewSize,
    
    className?: string,
    style?: {[index:string]: string},
}


export {PreviewSize, InputFileProps, FinalOutputSingle, FinalOutputMulti}