import { useEffect, useState } from "react"
import { prepareValueForStyleObject } from "../../utils"
import '../../style/loading.css'
import { LoadingProps } from "../../types/loading.type"





const Loading = (props:LoadingProps) => {
    
    const [loadingType, setLoadingType] = useState(props.type || 'dual-ring')
    const [loadingStyleObject, setLoadingStyleObject] = useState({minWidth: '20px', height:'20px'})
    const [loadingCLassPrefix, setLoadingCLassPrefix] = useState(props.classPrefix ? props.classPrefix+'__' : '' )


    useEffect(() => {
        if (props.width) setLoadingStyleObject(prevState=>({...prevState, minWidth: prepareValueForStyleObject(props.width!)}))
        if (props.height) setLoadingStyleObject(prevState => ({ ...prevState, height: prepareValueForStyleObject(props.height!) }))
        if(props.style) setLoadingStyleObject(prevState => ({ ...prevState, ...props.style }))
    }, [])



    return (
        <div className={['gamon-loading', props.className].join(' ')} style={loadingStyleObject}>
            
            { loadingType == 'dual-ring' &&
                <div className={loadingCLassPrefix+"gamon-loading__"+loadingType} >
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"--reverse"}></div>
                </div>
            }


            { loadingType == "bouncing-balls" &&
                <div className={loadingCLassPrefix+"gamon-loading__"+loadingType}>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__dot"}></div>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__dot"}></div>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__dot"}></div>
                </div>
            }


            {loadingType == "cradle" &&
                <div className={loadingCLassPrefix+"gamon-loading__"+loadingType}>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__dot"}></div>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__dot"}></div>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__dot"}></div>
                </div>
            }

            
            {loadingType == "wave" &&
                <div className={loadingCLassPrefix + "gamon-loading__" + loadingType}>
                    <div className={loadingCLassPrefix + "gamon-loading__" + loadingType+"__outer"}></div>
                    <div className={loadingCLassPrefix+"gamon-loading__"+loadingType+"__inner"}></div>
                </div>
            }
            

           

            
       </div>
    )
}




export default Loading