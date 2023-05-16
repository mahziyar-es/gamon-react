import { ReactNode } from "react"
import '../../style/gridRow.css'

interface RowProps {
    children?: ReactNode,
    
    className?: string,
    
    style?:{[index:string]: string},
}


const Row = (props: RowProps) => {

    return (
        <div
            className={["gamon-grid-row", props.className].join(" ")}
            style={props.style}
        >
            {props.children}
        </div>
    )
}

export default Row