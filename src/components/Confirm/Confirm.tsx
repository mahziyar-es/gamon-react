import { ToggleAnimations } from "../../types/general.type"
import { useEffect, useState } from "react"
import Sheet from "../Sheet/Sheet"
import { ConfirmProps } from "../../types/confirm.type"
import '../../style/confirm.css'
import { SheetProps } from "../../types/sheet.type"

type SheetTypes = SheetProps['type']



const Confirm = (props: ConfirmProps) => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [confirmButtonText, setConfirmButtonText] = useState('Yes')
    const [cancelButtonText, setCancelButtonText] = useState('No')
    const [confirmCallback, setConfirmCallback] = useState<()=>void>()
    const [cancelCallback, setCancelCallback] = useState<()=>void>()
    const [animation, setAnimation] = useState<ToggleAnimations>('fade')
    const [type, setType] = useState<SheetTypes>('center')
    const [show, setShow] = useState(false)
    



    useEffect(() => {
        init()
        window.addEventListener('gamonConfirmEvent', fireConfirm)
        return () => window.removeEventListener('gamonConfirmEvent', fireConfirm)
    }, [])



    const init = () => {
        if (props.animation)
            setAnimation(props.animation)
        if (props.confirmButtonText)
            setConfirmButtonText(props.confirmButtonText)
        if(props.cancelButtonText)
            setCancelButtonText(props.cancelButtonText)
        if(props.type)
            setType(props.type)
    }


    const fireConfirm = (e: Event) => {
        const data = (e as CustomEvent).detail
        
        setTitle(data.title)
        setText(data.text)
        setConfirmCallback(()=>data.confirmCallback)
        
        if(data.cancelCallback)
            setCancelCallback(()=>data.cancelCallback)
        if (data.animation)
            setAnimation(data.animation)
        if (data.confirmButtonText)
            setConfirmButtonText(data.confirmButtonText)
        if(data.cancelButtonText)
            setCancelButtonText(data.cancelButtonText)
        if(data.type)
            setType(data.type)


        toggle()
    }


    const toggle = () => {
        setShow(currValue => ! currValue)
    }

    
    const cancel = () => {
        toggle()
        if (cancelCallback) cancelCallback?.()
    }


    const confirm = () => {
        if(confirmCallback) confirmCallback?.()
        toggle()
    }


    return (
        <Sheet 
            width="300px" 
            minHeight="200px" 
            displayModel={[show, setShow]}
            animation={animation}
            type={type}
            dismissDisabled
        >

            <div className="gamon-confirm">
                <div className="gamon-confirm__body">
                    <h3 className="gamon-confirm__title">{title}</h3>
                    <p className="gamon-confirm__text">{text}</p>
                </div>
                <div className="gamon-confirm__buttons">
                    <button className="gamon-confirm__buttons__confirm" onClick={confirm}>  {confirmButtonText}  </button>
                    <button className="gamon-confirm__buttons__cancel" onClick={cancel}>{cancelButtonText}</button>
                </div>  
            </div>

        </Sheet>
    )

}


export default Confirm