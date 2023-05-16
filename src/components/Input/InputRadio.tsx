import { StyleObject } from "../../types/general.type";
import { useEffect, useRef, useState } from "react";
import { InputRadioProps } from "../../types/inputRadio.type";
import '../../style/inputRadio.css'


const InputRadio = <T extends string|number,>(props:InputRadioProps<T>) => {
    

    const radioInputEl = useRef<HTMLInputElement>(null)
    const radioState = useState(false)
    const [radioStyleObject] = useState(props.style || {})
    const [checkmarkStyleObject] = useState(props.checkmarkStyle || {})
    const [titleStyleObject] = useState(props.titleStyle || {})


    useEffect(() => {
        const v = props.value || props.model?.[0]
        syncModelValueAndUI(v)
    }, [props.value, props.model?.[0]])


    const clicked = ()=>{
        radioInputEl.current!.click()
        updateModelValue()
    }
    
    const syncModelValueAndUI = (modelValue?: T) => {
        if(modelValue == props.checkedValue) radioInputEl.current!.checked = true
        else radioInputEl.current!.checked = false
    }


    const updateModelValue = () => {
        props.onChange?.(props.checkedValue as T)
        props.model?.[1]?.(props.checkedValue as T)
    }



    return (
        <div className={['gamon-radio', props.className].join(" ")} onClick={clicked} style={radioStyleObject}>
            <input  className="gamon-radio__input" ref={radioInputEl} type="radio" name={props.name} value={props.checkedValue} />
            <div className={['gamon-radio__checkmark', props.checkmarkClass, radioState && 'gamon-radio__checkmark--checked'].join(" ")} style={checkmarkStyleObject}></div>
            <div className={['gamon-radio__title', props.titleClass].join(" ")} style={titleStyleObject}> {props.title} </div>
        </div>
    )

}

export default InputRadio