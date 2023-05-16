import { hideAnimation, showAnimation } from "../../utils";
import { useEffect, useRef, useState } from "react";
import iconDeleteCircular from '../../assets/icon_delete_circular.png'
import { NotifyTextBoxProps } from "../../types/notify.type";




const NotifyTextBox = (props: NotifyTextBoxProps) => {


    const notifyTextBoxEl = useRef<HTMLDivElement>(null)
    const notifyTextBoxTimerEl = useRef<HTMLDivElement>(null)
    const [notifyDurationStyle, setNotifyDurationStyle] = useState<number>(props.duration/1000)



    useEffect(() => {
        showAnimation(notifyTextBoxEl.current!, ()=>{
            if(props.duration != -1) // -1 means the notify will not fade automatically
                startTimerAnimation()
        })
    }, [])



    const startTimerAnimation = ()=>{
        setTimeout(()=>{
            notifyTextBoxTimerEl.current!.style.width = '0'
        },100)
        setTimeout(()=>{
            dismiss()
        },props.duration)
    }


    const dismiss = ()=>{
        hideAnimation(notifyTextBoxEl.current!, () => {
            try {
                props.parentEl.removeChild(notifyTextBoxEl.current!)
            } catch {
                return
            }
        })
    }




    return (
        <div className={['gamon-display-toggle gamon-display-toggle--animation-'+props.animation].join(" ")} ref={notifyTextBoxEl}>
            <div className={['gamon-notify__content-container  dta-child dta-animated', 'gamon-notify__content-container--type-'+props.type].join(" ")} >
                <p className="gamon-notify__content-container__text">{props.text}</p>
                {
                    props.duration != -1 &&
                    <div  className="gamon-notify__content-container__timer" ref={notifyTextBoxTimerEl} style={{ transitionDuration: notifyDurationStyle + 's' }}></div>
                }
                <img onClick={dismiss} className="gamon-notify__content-container__dismiss-button" src={iconDeleteCircular} />
            </div>
        </div>
    )


}


export {NotifyTextBox}