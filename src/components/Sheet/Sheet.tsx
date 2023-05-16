import { hideAnimation, prepareValueForStyleObject, showAnimation } from "../../utils"
import { useState, useEffect, ReactNode, useRef, forwardRef, useImperativeHandle } from "react"
import '../../style/sheet.css'
import iconClose from '../../assets/ic_close.png'
import { SheetProps } from "../../types/sheet.type"



type Sheet = {
    show : ()=>void,
    hide : ()=>void,
    toggle : ()=>void,
}


const Sheet = forwardRef((props: SheetProps, ref) => {
    
    const [bodyStyleObject, setBodyStyleObject] = useState(props.bodyStyle || {})
    const [backdropStyleObject, setBackdropStyleObject] = useState(props.backdropStyle || {})
    const sheetEl = useRef<HTMLDivElement>(null)
    const [isSheetVisible, setIsSheetVisible] = useState(false)


    useEffect(()=>{
        if (props.width)
            setBodyStyleObject(currObject => { return {...currObject, maxWidth: prepareValueForStyleObject(props.width!) } })
        if (props.height) {
            const height = prepareValueForStyleObject(props.height!)
            setBodyStyleObject(currObject => { return {...currObject, height: height , minHeight: height  } })
        }
        if (props.minHeight) {
            setBodyStyleObject(currObject => { return {...currObject, minHeight: prepareValueForStyleObject(props.minHeight!)  } })
        }
        
        
        addClickListenerToSheetTogglerButtons()
        return removeClickListenerFromSheetTogglerButtons // clean up function
    }, [])


    const addClickListenerToSheetTogglerButtons = () => {
        if (!props.id) return
        const btns = document.querySelectorAll("[gamon-sheet-toggle=" + (props.id) + "]")
        Array.from(btns).map(btn => {
            btn.addEventListener('click', toggle)
        })
    }


    const removeClickListenerFromSheetTogglerButtons = () => {
        if(!props.id) return
        const btns = document.querySelectorAll("[gamon-sheet-toggle=" + (props.id) + "]")
        Array.from(btns).map(btn => {
            btn.removeEventListener('click', toggle)
        })
    }


    useEffect(() => {
        if(props.displayModel?.[0] && !isSheetVisible)
            toggle()
        else if(!props.displayModel?.[0] && isSheetVisible)
            toggle()
    },  [props.displayModel?.[0]])



    const hide = () => {
        hideAnimation(sheetEl.current!)
        
        if(props.onDismiss)
            props.onDismiss()
       
        setIsSheetVisible(false)
        props.displayModel?.[1]?.(false)
    }


    const show = () => {
        showAnimation(sheetEl.current!)

        if(props.onDisplay)
            props.onDisplay()
        
        setIsSheetVisible(true)
        props.displayModel?.[1]?.(true)
    }


    const toggle = () => {
        if (isSheetVisible) hide()
        else show()
    }


    const backdropClickHandler = ()=>{
        if(props.onBackdropClick) props.onBackdropClick()
        dismissActionHandler()
    }


    const dismissActionHandler = () => {
        if(!props.dismissDisabled) toggle()
    }
    


    useImperativeHandle(ref, ()=>({
        show: ()=>show(),
        hide: ()=>hide(),
        toggle: ()=>toggle(),
    }));
    

    return (
        <div className={['gamon-sheet gamon-display-toggle', props.className, 'gamon-display-toggle--animation-'+props.animation].join(" ")} id={props.id} style={props.style} ref={sheetEl}>
            <div onClick={backdropClickHandler} className={["gamon-sheet__backdrop dta-child", props.backdropClass].join(" ")} style={backdropStyleObject}></div>
            <div className={['gamon-sheet__body dta-child dta-animated', props.bodyClass, 'gamon-sheet__body--type-' + (props.type || 'center')].join(" ")} style={bodyStyleObject}>
                
                { (!props.noHeader && (props.title || !props.dismissDisabled)) &&
                    <div className="gamon-sheet__body__header">
                        <div className="gamon-sheet__body__header__title">{props.title}</div>
                        {
                            !props.dismissDisabled &&
                            <div onClick={dismissActionHandler} className="gamon-sheet__body__header__dismiss-button">
                                <img src={iconClose} />
                            </div>
                        }
                    </div>
                }
                
                {props.children}
            </div>
        </div>
    )
})



export default Sheet