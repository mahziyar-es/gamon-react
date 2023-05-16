import { useEffect, useState } from "react"



interface InputFilePreviewProps{
    file : File|string,
}

const InputFilePreview = (props: InputFilePreviewProps) => {
    

    const [preview, setPreview] = useState<string>('')
    const [fileType, setFileType] = useState('')


    useEffect(()=>{
        if (!props.file) return
            
        setFileType(props.file instanceof File ? props.file.type : 'image')
        setPreview(props.file instanceof File ? URL.createObjectURL(props.file) : props.file )
    }, [])




    return (
        <>
            {(fileType == 'image/jpeg' || fileType == 'image/png' || fileType == 'image/jpg' || fileType == 'image/png' || fileType == 'image') &&
                <img className="gamon-input-file__preview" src={preview} />
            }

            { fileType == 'video/mp4' &&
                <video className="gamon-input-file__preview" src={preview} controls />
            }
            
            { fileType == 'audio/mpeg' &&
                <audio className="gamon-input-file__preview" src={preview} controls />
            }
            
            { fileType == 'application/pdf' &&
                <embed className="gamon-input-file__preview" src={preview}  />
            }
            
            { fileType == 'text/csv' &&
                <embed className="gamon-input-file__preview" src={preview}  />
            }

            { fileType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                <embed className="gamon-input-file__preview" src={preview}  />
            }
            
            { fileType == 'text/plain' &&
                <embed className="gamon-input-file__preview" src={preview}  />
            }
        </>
    )

}


export {InputFilePreview}