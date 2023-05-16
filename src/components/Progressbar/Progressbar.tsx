import { useState, useEffect } from 'react'
import { FlowAnimation } from './FlowAnimation'
import '../../style/progressbar.css'
import { ProgressbarProps } from '../../types/progressbar.type'





const Progressbar = (props: ProgressbarProps) => {

    const [progressValue, setProgressValue] = useState(props.value || 0)
    const [animation, setAnimation] = useState(props.animation)
    const [progressStyleObject, setProgressStyleObject] = useState(props.progressStyle || {})
    const [bgStyleObject, setBgStyleObject] = useState(props.style || {})
    const [textStyleObject, setTextStyleObject] = useState(props.textStyle || {})
    const [flowParticleStyleObject, setFlowParticleStyleObject] = useState(props.flowParticleStyle || {})
    const [flasherStyleObject, setFlasherStyleObject] = useState(props.flasherStyle || {})



    useEffect(() => {
        prepareStyleObjects()
    }, [])
    

    useEffect(() => {
        setProgressValue(props.value)
        syncModelValueAndUi()
    }, [props.value])


    const syncModelValueAndUi = () => {
        setProgressStyleObject((currObject) => { return { ...currObject, width: progressValue+'%'! } } )
    }


    const prepareStyleObjects = () => {
        if(props.progressColor) 
            setProgressStyleObject((currObject) => { return { ...currObject, background: props.progressColor! } } )
        if (props.bgColor)
            setBgStyleObject((currObject) => { return { ...currObject, background: props.bgColor! } } )
        if(props.textColor) 
            setTextStyleObject((currObject) => { return { ...currObject, color: props.textColor! } } )
        if(props.textFontSize) 
            setTextStyleObject((currObject) => { return { ...currObject, fontSize: props.textFontSize! } } )
        if(props.flowParticleColor) 
            setFlowParticleStyleObject((currObject) => { return { ...currObject, background: props.flowParticleColor! } } )
        if(props.flasherColor) 
            setFlasherStyleObject((currObject) => { return { ...currObject, background: props.flasherColor! } })
    }



    return (
        <div className={['gamon-progressbar', props.className].join(" ")} style={bgStyleObject}>

            <span  className={['gamon-progressbar__text', props.textClass].join(" ")} style={textStyleObject}>
                { !props.hideValue && <span>{progressValue} % </span> }
                <span > {props.text || '' }</span>
            </span>

            <div className={['gamon-progressbar__progress', props.progressClass].join(" ")} style={progressStyleObject} >
                {
                    animation == 'flash'
                    &&
                    <span className={['gamon-progressbar__progress__animation-flasher', props.flasherClass].join(" ")} style={ flasherStyleObject } ></span>
                }
                {
                    animation == 'flow'
                    &&
                    <FlowAnimation particleStyle={ flowParticleStyleObject } particleClass={props.flowParticleClass} />
                }
            </div>
        </div>
    )
    
}




export default Progressbar