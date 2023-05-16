
interface ProgressbarProps  {
    value:string|number,
    text?:string,
    hideValue?:boolean,
    animation?:'flash' | 'flow',
    progressColor?:string,
    flowParticleColor?:string,
    flasherColor?:string,
    bgColor?:string,
    textColor?:string,
    textFontSize?: string,
    
    progressStyle?:{[index:string]: string},
    textStyle?:{[index:string]: string},
    flowParticleStyle?:{[index:string]: string},
    flasherStyle?: {[index:string]: string},
    
    progressClass?:string,
    textClass?:string,
    flowParticleClass?:string,
    flasherClass?: string,
    
    style?:{[index:string]: string},
    className?:string,

}


export {
    ProgressbarProps,
}