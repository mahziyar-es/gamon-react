import React, { forwardRef, useImperativeHandle, useRef } from "react"
import '../../style/grabScroll.css'
import { ScrollProps } from "../../types/grabScroll"


const GrabScroll = forwardRef((props: ScrollProps, ref) => {

    const containerEl = useRef<HTMLDivElement>(null)
    const mouseDown = useRef(false)
    const mouseStartingPosition = useRef(0)
    const currentScroll = useRef(0)


    
    const mouseMoveHandler = async (e:React.MouseEvent)=>{
        e.preventDefault();
        if(!mouseDown.current) { return; }
        const mousePosition = await getMousePosition(e);
        const distanceToBeScrolled =  -1*(mousePosition - mouseStartingPosition.current - currentScroll.current);
        if (props.vertical) containerEl.current!.scrollTop = distanceToBeScrolled;
        else containerEl.current!.scrollLeft = distanceToBeScrolled;
        
    }


    const startDragging = async (e: React.MouseEvent) => {
        mouseDown.current = true;
        mouseStartingPosition.current = await getMousePosition(e)
        currentScroll.current = props.vertical ? containerEl.current!.scrollTop : containerEl.current!.scrollLeft;
    }


    const stopDragging = () => mouseDown.current = false;
    

    const getMousePosition = async (e: React.MouseEvent) => {
        return props.vertical ? (e.pageY - containerEl.current!.offsetTop) : (e.pageX - containerEl.current!.offsetLeft)
    }


    useImperativeHandle(ref, () => ({
        children: containerEl.current!.children,
        containerEl: containerEl.current,
    }))



    return (
        <div
            className={[
                "gamon-grab-scroll",
                props.hideScrollbar && 'scrollbar-hide',
                props.vertical && 'gamon-grab-scroll--vertical',
            ].join(" ")}
            onMouseMove={mouseMoveHandler}
            onMouseDown={startDragging}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            ref={containerEl} 
        >
            {props.children}
        </div>
    )
})

export default GrabScroll