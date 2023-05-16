import { InputLayoutProps } from "../../types/inputLayout.type";
import '../../style/inputLayout.css'
import React from "react";

const InputLayout = (props: InputLayoutProps) => {

    const clickHandler = (e:React.MouseEvent) => {
        props.onClick?.(e)
    }

    return (
        <div className="gamon-input" onClick={clickHandler}>
            { props.title &&
                <p className="gamon-input__title">{props.title}</p>
            }
            <div className={['gamon-input__icon-container', props.className].join(' ')} style={props.style}>
                { props.icon &&
                    <div className="gamon-input__icon-container__icon">
                        <img src={props.icon} />
                    </div>
                }
                {props.children}
            </div>
        </div>
    )
}


export default InputLayout