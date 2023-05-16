import { PreviewSize } from "../../../types/inputFile.type";
import React, { useRef } from "react"
import { InputFilePreview } from "./InputFilePreview"
import { getTimestamp } from "../../../utils";
import iconDeleteCircular from '../../../assets/icon_delete_circular.png'


interface MultiFileSelectionProps {
    onFileSelection: (file: File) => void,
    onRemoveSelectedFile: (index:number) => void,
    finalOutput: (File | string)[],
    selectedFileName: string[],
    dragDrop ?: boolean,
    preview ?: boolean,
    previewSizeObject ?: PreviewSize,
}

const MultiFileSelection = (props:MultiFileSelectionProps) => {
    
    const dragOverHandler = (e:React.DragEvent)=> e.preventDefault();

    const dropHandler = (e:React.DragEvent)=> {
        e.preventDefault();
        if (e.dataTransfer && e.dataTransfer.files[0]) props.onFileSelection(e.dataTransfer.files[0])
    }



    const removeFile = (e:React.MouseEvent, index:number) => {
        e.stopPropagation()
        props.onRemoveSelectedFile(index)
    }


    return (
        <div className={['gamon-input__input', props.dragDrop && 'gamon-input-file--drag-drop', ].join(" ")} onDragOver={dragOverHandler} onDrop={dropHandler} >
            {props.preview ? (
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    {props.finalOutput && props.finalOutput.length > 0 && props.finalOutput.map((file, index) => (
                        <div key={index}  className="gamon-input-file__multi-file-preview-container" style={props.previewSizeObject}>
                            <img onClick={(e)=>removeFile(e, index)} className="gamon-input-file__multi-file-preview-container__remove-file-btn" src={iconDeleteCircular} />
                            <InputFilePreview file={file} key={index +''+ getTimestamp()} />
                            <span className="gamon-input-file__selected-file-name">{ props.selectedFileName[index] || '' }</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    {props.finalOutput && props.finalOutput.map((file, index) => (
                        <div key={index} >
                            <div className="gamon-input-file__multi-file-name-preview" >
                                <img onClick={(e)=>removeFile(e, index)} className="gamon-input-file__multi-file-name-preview__remove-file-btn" src={iconDeleteCircular} />
                                { props.selectedFileName[index] || '' }
                            </div>
                        </div>
                    ))}
                </div >
            )}
        </div>
    )
}


export {MultiFileSelection}