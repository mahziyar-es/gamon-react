import { ReactNode } from "react"
import '../../style/gridCol.scss'

interface ColProps {
    children?: ReactNode,
    width?: string,
    
    className?: string,
    
    style ?: {[index:string] : string},
}


const Col = (props: ColProps) => {
    return (
        <div
            className={["gamon-grid-col", props.className, props.width].join(" ")}
            style={props.style}
        >
            {props.children}
        </div>
    )
}

export default Col