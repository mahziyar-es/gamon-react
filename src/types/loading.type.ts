
interface LoadingProps {
    classPrefix ?: string,
    type ? :'dual-ring' | 'bouncing-balls' | 'cradle' | 'wave',
    fullScreen?: boolean,
    width ?: string|number,
    height?: string | number,

    style?:{ [index: string]: string }
    className?:string
}


export {
    LoadingProps,
}