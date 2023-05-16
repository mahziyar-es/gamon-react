import { getTimestamp } from "../../../utils";
import React, { useEffect } from "react";
import { PreviewSize } from "../../../types/inputFile.type";
import { InputFilePreview } from "./InputFilePreview"
import iconDeleteCircular from '../../../assets/icon_delete_circular.png'



interface SingleFileSelectionProps {
    onFileSelection: (file: File) => void,
    onRemoveSelectedFile: () => void,
    finalOutput: File|string,
    selectedFileName: string,
    
    preview ?: boolean,
    dragDrop ?: boolean,
    previewSizeObject ?: PreviewSize,
}

const SingleFileSelection = (props:SingleFileSelectionProps) => {
    

    const dragOverHandler = (e:React.DragEvent)=> e.preventDefault();

    const dropHandler = (e:React.DragEvent)=> {
        e.preventDefault();
        if (e.dataTransfer && e.dataTransfer.files[0]) props.onFileSelection(e.dataTransfer.files[0])
    }

   

    const removeSingleSelectedFile = (e:React.MouseEvent)=>{
        e.stopPropagation()
        props.onRemoveSelectedFile()
    }


    return (
        <div className={['gamon-input__input', props.dragDrop && 'gamon-input-file--drag-drop',].join(" ")} onDragOver={dragOverHandler} onDrop={dropHandler}>
            
            {props.finalOutput &&
                <>
                    { props.preview? 
                        <div className="gamon-input-file__single-file-preview-container" style={props.previewSizeObject}>
                            <img onClick={removeSingleSelectedFile} className="gamon-input-file__single-file-preview-container__remove-file-btn" src={iconDeleteCircular} />
                            <InputFilePreview file={props.finalOutput} key={getTimestamp()} />
                            <div className="gamon-input-file__selected-file-name">{props.selectedFileName || '' }</div>
                        </div>
                        :
                        <div className="gamon-input-file__selected-file-name">{props.selectedFileName || '' }</div>
                    }
                </>
            }
           
        </div>
    )


}


export {SingleFileSelection}