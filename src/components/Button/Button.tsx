import React, {useState, useEffect, useRef} from "react";
import type { ButtonProps } from "../../types/button.type";
import '../../style/button.css'
import { prepareValueForStyleObject } from "../../utils";
import Loading from "../Loading/Loading";


const Button = (props: ButtonProps) => {

    const buttonEl = useRef<HTMLButtonElement>(null)
    const buttonInitialWidth = useRef<number>(0)

    const [buttonStyleObject, setButtonStyleObject] = useState(props.style || {})
    const [textStyleObject, setTextStyleObject] = useState(props.textStyle || {})
    const [loadingCircleStyleObject, setLoadingCircleStyleObject] = useState({})
    const [buttonSize, setButtonSize] = useState(props.size || 'medium')
    const [buttonLoadingEffect, setButtonLoadingEffect] = useState(props.loadingEffect || 'default')
    const [buttonType, setButtonType] = useState(props.type || 'button')
    const [buttonLoadingType, setButtonLoadingType] = useState(props.loadingType || 'dual-ring')

    
    useEffect(() => {
        if (props.width)
            setButtonStyleObject(prevStyleObject => { return { ...prevStyleObject, maxWidth: prepareValueForStyleObject(props.width!) } } )
        if (props.height)
            setButtonStyleObject(prevStyleObject => { return { ...prevStyleObject, height: prepareValueForStyleObject(props.height!) } })
    }, [])


    return (
        <button
            type={buttonType}
            className={[
                'gamon-button', 
                'gamon-button--size-'+buttonSize, 
                props.widthParent && 'gamon-button--width-parent', 
                props.loading && ('gamon-button--loading gamon-button--loading-'+buttonLoadingEffect ),
                'gamon-button--type-'+(props.outline?'outline':'default'),
                props.rounded && 'gamon-button--rounded',
                props.disabled && 'gamon-button--disabled',
                props.className,
            ].join(' ')}
            style={buttonStyleObject}
            onClick={props.onClick}
            ref={buttonEl}
        >

            {
                !(props.loading && (buttonLoadingEffect == 'simple')) && (
                    props.children ?
                    (props.children)
                    :
                    <div className={['gamon-button__text', props.textClass].join(" ")} style={ textStyleObject }> {props.text} </div>
                )
            }

            
            { props.loading && (
                
                props.loadingCustomChild ? (
                    props.loadingCustomChild
                ) : (
                <div>
                    <Loading type={buttonLoadingType} width={30} height={30} classPrefix={props.loadingClassPrefix || 'gamon-button'} />
                </div>
            ))}
                
            
        
        </button>
    )
}

export default Button