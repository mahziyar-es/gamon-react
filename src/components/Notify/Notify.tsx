import { ToggleAnimations } from "../../types/general.type"
import { NotifyPorps, NotifyTextBoxProps } from "../../types/notify.type"
import { useEffect, useRef, useState } from "react"
import '../../style/notify.css'
import { NotifyTextBox } from "./NotifyTextBox"




const Notify = (props:NotifyPorps) => {

    const [notifies, setNotifies] = useState<{text:string, type:NotifyTextBoxProps['type'], duration:number, animation:ToggleAnimations}[]>([])
    const notifyEl = useRef<HTMLDivElement>(null)


    useEffect(() => {
        window.addEventListener('gamonNotifyEvent', addNewNotif  )
        return ()=> window.removeEventListener('gamonNotifyEvent', addNewNotif )
    }, [])


    const addNewNotif = (e: Event) => {

        let {text, type, animation, duration} = (e as CustomEvent).detail

        if (typeof (text) == 'string') text = [text]
    
        text.forEach((notifyText: string) => {
            setNotifies(currArray => {
                return [...currArray,
                    {
                        text:notifyText,
                        type:type,
                        duration:duration || props.duration || 4000,
                        animation:animation || props.animation || 'fade',
                    }
                ]
            })
        })    
    }


    return (
        <div className={['gamon-notify', 'gamon-notify--position-' + props.position].join(" ")} ref={notifyEl}>
            {notifies.map((notify, index) => (
                <NotifyTextBox
                    key={index}
                    parentEl={notifyEl.current!}
                    text={notify.text} 
                    type={notify.type} 
                    duration={notify.duration} 
                    animation={notify.animation} 
                />
            ))
            }
        </div>

        
             
    )
}



export default Notify
