import { useEffect, useRef, useState } from "react"
import { CustomClickProps } from "../../types/customClick.type"


const CustomClick = (props: CustomClickProps) => {

    type IntervalType = ReturnType<typeof setInterval>

    const container = useRef<HTMLDivElement>(null) 
    const interval = useRef<IntervalType | number>() 
    const [longClickDuration, setLongClickDuration] = useState(props.longClickDuration || 1000)


    useEffect(() => {
        addListeners()
        return ()=> removeListeners()
    }, [])
    

    const addListeners = () => {
        container.current?.addEventListener('mousedown',  mousedownHandler )
        container.current?.addEventListener('mouseup', mouseupHandler )
        container.current?.addEventListener('touchstart', mousedownHandler )
        container.current?.addEventListener('touchend', mouseupHandler)
    }


    const removeListeners = () => {
        container.current?.removeEventListener('mousedown',  mousedownHandler )
        container.current?.removeEventListener('mouseup', mouseupHandler )
        container.current?.removeEventListener('touchstart', mousedownHandler )
        container.current?.removeEventListener('touchend', mouseupHandler )
    }


    const mousedownHandler = (e: MouseEvent | TouchEvent) => {
        let counter = 0

        interval.current = setInterval(() => {
            counter += 100
            if (counter >= longClickDuration) {
                counter = 0
                clearInterval(interval.current as IntervalType)
                interval.current = -1
                props.onLongClick?.(e)
            }
        },100)
    }
    
    
    const mouseupHandler = (e: MouseEvent | TouchEvent) => {
        if (interval.current != -1)  props.onClick?.(e)
        clearInterval(interval.current as IntervalType)
    }


    return (
        <div ref={container} className={props.className} style={props.style}>
            {props.children}
        </div>
    )
}


export default CustomClick