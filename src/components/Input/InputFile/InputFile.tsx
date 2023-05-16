import { FinalOutputMulti, FinalOutputSingle, InputFileProps } from "../../../types/inputFile.type"
import { useEffect, useRef, useState } from "react"
import { getTimestamp, prepareValueForStyleObject } from "../../../utils"
import InputLayout from "../InputLayout"
import Sheet from "../../Sheet/Sheet"
import Cropper from "../../Cropper/Cropper"
import { SingleFileSelection } from "./SingleFileSelection"
import { MultiFileSelection } from "./MultiFileSelection"
import '../../../style/inputFile.css'


const InputFile = <T extends string|File|string[]|File[]|undefined,>(props:InputFileProps<T>) => {
    
    const fileBrowserInputEl = useRef<HTMLInputElement>(null)
    const cropperModalEl =  useRef<Sheet>(null)

    const [computedPlaceholder, setCumputedPlaceholder] =  useState<string>('')
    const [acceptableFileTypes, setAcceptableFileTypes] =  useState<string>('')
    const [previewSizeObject, setPreviewSizeObject] = useState({ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%' })
    const [imageFileToBeCropped, setImageFileToBeCropped] =  useState<File|string>('')
    const [finalOutput, setFinalOutput] = useState< FinalOutputSingle | FinalOutputMulti >(props.multi ? [] : '' )
    const [selectedFileNames, setSelectedFileNames] = useState< string|string[] >('')



    useEffect(()=>{
        if(props.previewSize){
            if(props.previewSize.width) setPreviewSizeObjectProps('width')
            if(props.previewSize.height) setPreviewSizeObjectProps('height')
            if(props.previewSize.maxWidth) setPreviewSizeObjectProps('maxWidth')
            if(props.previewSize.maxHeight) setPreviewSizeObjectProps('maxHeight')
        }
    }, [])


    useEffect(() => {
        const v = props.value || props.model?.[0]
        if(v != finalOutput) processModelValue(v)
    }, [props.value, props.model?.[0]])


    

    const processModelValue = (modelValue?:T) => {
        if(!modelValue || ((modelValue as FinalOutputMulti).length == 0 && (finalOutput as FinalOutputMulti).length > 0 ) ) clear()
    }


    const setPreviewSizeObjectProps = (prop: string) => {
        setPreviewSizeObject(prevState =>( {...prevState, [prop] : prepareValueForStyleObject(props.previewSize![prop])  } ))
    }


    const openFileBrowser = ()=> fileBrowserInputEl.current!.click()


    const determinePlaceholder = () => {
        let computedPlaceholder;
        if(props.multi) computedPlaceholder = (finalOutput as FinalOutputMulti).length == 0 ? props.placeholder : ''
        else computedPlaceholder = finalOutput ? '' : props.placeholder
        
        setCumputedPlaceholder(computedPlaceholder || '')
    }


    useEffect(() => {
        determineAcceptableFileTypes()
    }, [props.accept])
    

    // type: "image/jpeg"
    // type: "video/mp4"
    // type: "audio/mpeg"
    // type: "application/pdf"
    // type: "text/csv"
    // type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    // type: "text/plain"

    const determineAcceptableFileTypes = ()=>{
        if(props.accept)
            setAcceptableFileTypes(props.accept)
        else{
            let types = ''
            if(props.video)
                types += 'video/*'
            if(props.audio)
                types += ',audio/*'
            if(props.image)
                types += ',image/*'

            setAcceptableFileTypes(types)
        }
    }

    

    // ========================================== cropper
    const openCropper = (file:File)=>{
        setImageFileToBeCropped(file)
        cropperModalEl.current?.show()
    }
   
    const closeCropper = ()=>{
        cropperModalEl.current?.hide()
    }
   
    const croppingDone = (output: any) => {
        closeCropper()

        // output = new File([
        //     new Blob([output])
        // ], imageFileToBeCropped.name,{type:'image/png'})

        addSelectedFileToOutput(output)
    }
   

    const checkForCropper = (file:File)=>{
        if (!file) return
        
        saveSelectedFileName(file)
        
        if(props.cropper) openCropper(file)
        else addSelectedFileToOutput(file)
    }



    // ======================================================= output manipulation

    const saveSelectedFileName = (file:File) => {
        if(props.multi) setSelectedFileNames(prevState=>([...(prevState as string[]), file.name]))
        else setSelectedFileNames(file.name)    
    }


    const addSelectedFileToOutput = (val: File) => {
        if(props.multi) setFinalOutput(prevState=>([...(prevState as FinalOutputMulti), val]))
        else setFinalOutput(val)
    }


    const removeSelectedFileFromOutput = (index?: number) => {
        if(props.multi){
            setFinalOutput( prevState => {
                return (prevState as FinalOutputMulti).filter((file, i) => {
                    return i != index 
                })   
            })

            setSelectedFileNames( prevState => {
                return (prevState as string[]).filter((fileName, i) => {
                    return i != index 
                })   
            })
            
        } else {
            setFinalOutput('')
            setSelectedFileNames('')
        }
    }


    useEffect(() => {
        determinePlaceholder()
        props.onChange?.(finalOutput as T)
        props.model?.[1]?.(finalOutput as T)
    }, [finalOutput])



    const clear = () => {
        if (props.multi) {
            setSelectedFileNames([])
            setFinalOutput([])
        }
        else {
            setSelectedFileNames('')
            setFinalOutput('')
        }
    } 


    return (

        <InputLayout title={props.title} icon={props.icon} className={props.className} style={props.style}>

            <input
                className="gamon-input-file__input"
                type="file"
                onChange={(e)=>checkForCropper(e.target.files![0])}
                required={props.required}
                ref={fileBrowserInputEl}
                accept={acceptableFileTypes}
            />

            <div onClick={openFileBrowser} className="gamon-input-file">

                {computedPlaceholder ?
                    <input placeholder={computedPlaceholder} className="gamon-input__input" readOnly />
                    :
                    <>
                        {props.multi ?
                            <MultiFileSelection
                                preview={props.preview}
                                previewSizeObject={previewSizeObject}
                                finalOutput={finalOutput as FinalOutputMulti}
                                selectedFileName={selectedFileNames as string[]}
                                onFileSelection={(file) => checkForCropper(file)}
                                onRemoveSelectedFile={removeSelectedFileFromOutput}
                            />
                            :
                            <SingleFileSelection
                                preview={props.preview}
                                previewSizeObject={previewSizeObject}
                                finalOutput={finalOutput as FinalOutputSingle}
                                selectedFileName={selectedFileNames as string}
                                onFileSelection={(file) => checkForCropper(file)}
                                onRemoveSelectedFile={removeSelectedFileFromOutput}
                            />
                        }
                        
                    </>
                }
            </div>

            <Sheet ref={cropperModalEl} >
                <Cropper image={imageFileToBeCropped} onCrop={(output)=>croppingDone(output)} />
            </Sheet>

        </InputLayout>
    
    )
}   


export default InputFile