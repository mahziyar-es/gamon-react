import { useEffect, useRef, useState } from "react";
import { CropperProps } from "../../types/cropper.type";
import Button from "../Button/Button";
import '../../style/cropper.css'



const Cropper = (props:CropperProps) => {
    
    const croppingCanvas = useRef<HTMLCanvasElement>(null)
    const cropperDisplayedImage = useRef<HTMLImageElement>(null)
    const cropperWindow = useRef<HTMLDivElement>(null)
    const container = useRef<HTMLDivElement>(null)
    const resizerEl = useRef<HTMLDivElement>(null)
    const imageToBeCropped = useRef<string>()
    const resizeMouseIsDown = useRef<boolean>(false)
    const cropperWindowPositionChanged = useRef<boolean>(false)
    const resizerLastPosition = useRef({x:0, y:0})
    const mouseIsDown = useRef(false)
    
    const [showCropperWindowResizer, setShowCropperWindowResizer] = useState<boolean>(true)
    const [cropperWindowDims, setCropperWindowDims] = useState({ width: '90%', height: '90%' })



    const updateModelValue = async ()=>{
        if(resizeMouseIsDown.current || mouseIsDown.current)
            return 

        cropper()
    }



    useEffect(()=>{
        init()
        addEventListeners()
        return ()=>removeEventListeners()
    }, [])


    useEffect(()=>{
        init()
    }, [props.image])


    const addEventListeners = () => {
        container.current?.addEventListener('mouseup', resizerMouseup)
        container.current?.addEventListener('mouseleave', resizerMouseleave)
        container.current?.addEventListener('mousemove', resizerMousemove)
        container.current?.addEventListener('touchend', resizerMouseleave, {passive:false})
        container.current?.addEventListener('touchmove', resizerMousemove, { passive: false })
        
        cropperWindow.current?.addEventListener('mousedown', mousedownHandler)
        cropperWindow.current?.addEventListener('mouseup', mouseupHandler)
        cropperWindow.current?.addEventListener('mouseleave', mouseupHandler)
        cropperWindow.current?.addEventListener('mousemove', mousemoveHandler)
        cropperWindow.current?.addEventListener('touchstart', mousedownHandler,{passive:false})
        cropperWindow.current?.addEventListener('touchend', mouseupHandler,{passive:false})
        cropperWindow.current?.addEventListener('touchmove', mousemoveHandler, { passive: false })
        
        resizerEl.current?.addEventListener('mousedown', resizerMousedown)
        resizerEl.current?.addEventListener('mousemove', resizerMousemove)
        resizerEl.current?.addEventListener('touchstart', resizerMousedown, { passive: false })
        resizerEl.current?.addEventListener('touchmove', resizerMousemove, { passive: false })
    }


    const removeEventListeners = () => {
        container.current?.removeEventListener('mouseup', resizerMouseup)
        container.current?.removeEventListener('mouseleave', resizerMouseleave)
        container.current?.removeEventListener('mousemove', resizerMousemove)
        container.current?.removeEventListener('touchend', resizerMouseleave, {passive:false})
        container.current?.removeEventListener('touchmove', resizerMousemove, { passive: false })

        cropperWindow.current?.removeEventListener('mousedown', mousedownHandler)
        cropperWindow.current?.removeEventListener('mouseup', mouseupHandler)
        cropperWindow.current?.removeEventListener('mouseleave', mouseupHandler)
        cropperWindow.current?.removeEventListener('mousemove', mousemoveHandler)
        cropperWindow.current?.removeEventListener('touchstart', mousedownHandler,{passive:false})
        cropperWindow.current?.removeEventListener('touchend', mouseupHandler,{passive:false})
        cropperWindow.current?.removeEventListener('touchmove', mousemoveHandler, { passive: false })

        resizerEl.current?.removeEventListener('mousedown', resizerMousedown)
        resizerEl.current?.removeEventListener('mousemove', resizerMousemove)
        resizerEl.current?.removeEventListener('touchstart', resizerMousedown, { passive: false })
        resizerEl.current?.removeEventListener('touchmove', resizerMousemove, { passive: false })
    }



    const init = () => {
        
        if(props.image instanceof File)
            imageToBeCropped.current = URL.createObjectURL(props.image)
        else 
            imageToBeCropped.current = props.image

        cropperDisplayedImage.current!.src = imageToBeCropped.current!

        // setting the cropper window dims
        if (props.cropper && props.cropper.width)
            setCropperWindowDims(prevState=> ({...prevState,  width: props.cropper!.width + 'px' }) )
        if (props.cropper && props.cropper.height)
            setCropperWindowDims(prevState=> ({...prevState,  height: props.cropper!.width + 'px' }) )

        if (props.cropper && props.cropper.width && props.cropper.height)
            setShowCropperWindowResizer(false)
    }


    

    // ============================================================================================
    // ==================================== resizer handlers  =====================================
    // ============================================================================================
    const resizerMousedown = ()=>{
        resizeMouseIsDown.current = true
    }
    const resizerMouseup = ()=>{
        if(!resizeMouseIsDown.current) return 
        resizeMouseIsDown.current = false
    }
    const resizerMouseleave = ()=>{
        if(!resizeMouseIsDown.current) return 
        resizeMouseIsDown.current = false
    }
    const resizerMousemove = async (e:MouseEvent|TouchEvent)=>{
        if(!resizeMouseIsDown.current) return

        let movementSpeed = cropperWindowPositionChanged.current ? 1 : 2

        const [xDirection, yDirection] = await detectResizerMoveDirection(e)

        const cropperWBoundingRect = cropperWindow.current!.getBoundingClientRect()

        if (!(props.cropper && props.cropper.width))
            setCropperWindowDims(prevState=> ({...prevState, width: ( (cropperWBoundingRect.width) + 1*(xDirection * movementSpeed ) ) +'px' }) )
        if(! (props.cropper && props.cropper.height) )
            setCropperWindowDims(prevState => ({ ...prevState, height: ((cropperWBoundingRect.height) + 1 * (yDirection * movementSpeed)) + 'px' }) )

    }

    const detectResizerMoveDirection = async (e:MouseEvent|TouchEvent)=>{
        let xDirection = 0
        let yDirection = 0

        if(e instanceof MouseEvent){
            xDirection = e.movementX
            yDirection = e.movementY
        } else {
            xDirection = resizerLastPosition.current.x == 0 ? 0 : e.changedTouches[0].clientX - resizerLastPosition.current.x 
            yDirection = resizerLastPosition.current.y == 0 ? 0 : e.changedTouches[0].clientY - resizerLastPosition.current.y 

            resizerLastPosition.current.x = e.changedTouches[0].clientX
            resizerLastPosition.current.y = e.changedTouches[0].clientY
        }

        return [xDirection, yDirection]
    }

   
    // ============================================================================================
    // ==================================== cropper window drag handlers  =========================
    // ============================================================================================
    const mousedownHandler = ()=>{
        mouseIsDown.current = true
    }

    const mouseupHandler = ()=>{
        if(!mouseIsDown.current) return 
        mouseIsDown.current = false
    }

    const mousemoveHandler = (e:MouseEvent|TouchEvent)=>{
        e.stopPropagation()

        if(!mouseIsDown.current || resizeMouseIsDown.current) return 

        cropperWindowPositionChanged.current = true

        const cropperWindowBoundingRect = cropperWindow.current!.getBoundingClientRect()
        const containerBoundingRect = container.current!.getBoundingClientRect()

        let [mouseX, mouseY] = [0,0]

        if(e instanceof MouseEvent){        
            mouseX = e.clientX
            mouseY = e.clientY
        } else if (e instanceof TouchEvent){
            mouseX = e.changedTouches[0].clientX
            mouseY = e.changedTouches[0].clientY
        }


        let fromLeft = (mouseX - cropperWindowBoundingRect.width/2 - containerBoundingRect.left )
        let fromTop = (mouseY - cropperWindowBoundingRect.height/2  - containerBoundingRect.top ) 


        cropperWindow.current!.style.left = fromLeft  +'px'
        cropperWindow.current!.style.top = fromTop +'px'
        cropperWindow.current!.style.right = 'unset'
        cropperWindow.current!.style.bottom = 'unset'

    }


    // ============================================================================================
    // ==================================== cropper logic  ========================================
    // ============================================================================================
    const cropper = async ()=>{

        var image = new Image();
        image.src = imageToBeCropped.current!;

        const croppingCanvasCtx = croppingCanvas.current!.getContext('2d');

        image.onload = async ()=>{
            const originalWidth = image.naturalWidth;
            const originalHeight = image.naturalHeight;
            const aspectRatio = originalWidth/originalHeight;


            const imageBoundingBox = cropperDisplayedImage.current!.getBoundingClientRect()
            const displayWidth = Math.round( imageBoundingBox.width )
            const displayHeight = Math.round( imageBoundingBox.height )

            const xRatio = (originalWidth/displayWidth)
            const yRatio = (originalHeight/displayHeight)



            const cropperWindowBoundingRect = cropperWindow.current!.getBoundingClientRect()

            let newWidth = cropperWindowBoundingRect.width * xRatio
            let newHeight = cropperWindowBoundingRect.height *yRatio

            
            let outputWidth = newWidth;
            let outputHeight = newHeight;

            if(props.output && props.output.width)
                outputWidth = props.output.width
            if(props.output && props.output.height)
                outputHeight = props.output.height 
          

            const containerBoundingRect = container.current!.getBoundingClientRect()
            let x = (cropperWindowBoundingRect.left - containerBoundingRect.left) * xRatio
            let y = (cropperWindowBoundingRect.top - containerBoundingRect.top) * yRatio
            

            croppingCanvas.current!.width = outputWidth
            croppingCanvas.current!.height = outputHeight

            
            croppingCanvasCtx!.drawImage(image, x , y, newWidth, newHeight, 0, 0, outputWidth, outputHeight)


            // resize
            // croppingCanvasCtx!.drawImage(image, 0 , 0, newWidth, newHeight)

            let output = await getImageDataFromCanvas()
            props.onCrop(output)
        }
    }


    const downloadOutput = async (e:Event)=>{
        e.preventDefault()

        let tempLink = document.createElement('a');
  
        let fileName = `output.png`;
        
        tempLink.download = fileName;
        tempLink.href = await getImageDataFromCanvas()
    
        tempLink.click();
    }


    const getImageDataFromCanvas = async () =>{
        return croppingCanvas.current!.toDataURL("image/png", 1);
       
    } 
    



    return (
        <>
            <div className="gamon-cropper"  ref={container}>
                <img className="gamon-cropper__image" ref={cropperDisplayedImage} />
                <div className="gamon-cropper__window" ref={cropperWindow}  style={cropperWindowDims}>
                    <div className="gamon-cropper__resize-handle-container">
                        {showCropperWindowResizer && <div  className="gamon-cropper__resize-handle" ref={resizerEl}></div>}
                    </div>
                </div>
                <canvas className="gamon-cropper__canvas" ref={croppingCanvas} ></canvas>
            </div>
            <Button onClick={updateModelValue} text="Done" buttonClass="gamon-cropper__done-button" />
        </>
    )

}



export default Cropper