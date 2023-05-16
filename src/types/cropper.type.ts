interface CropperProps{
    image : File | string,
    output ?:  {
        width:number,
        height:number,
        type:string,
    },
    cropper ?: {
        width:number,
        height:number,
    },

    onCrop:(output:any)=>void,
}


export {CropperProps}