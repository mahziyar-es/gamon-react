import { useEffect, useRef, useState } from "react"
import { StyleObject } from "../../types/general.type"
import { InputCheckboxProps } from "../../types/inputCheckbox.type"
import '../../style/inputCheckbox.css'


const InputCheckbox = <T extends number|string|boolean ,>(props: InputCheckboxProps<T>) => {
    
    const checkboxInputEl = useRef<HTMLInputElement>(null)
    const checkmarkEl = useRef<HTMLDivElement>(null)
    const [checkboxState, setCheckboxState] = useState(false)
    const [checkboxStyleObject] = useState(props.style || {})
    const [checkmarkStyleObject] = useState(props.checkmarkStyle || {})
    const [titleStyleObject] = useState(props.titleStyle || {})

    useEffect(() => {
        if(!props.binary && !props.checkedValue) console.error('Please provide checkedValue for InputCheckbox when binary is false')
    },[])


    useEffect(() => {
        const v = props.value || props.model?.[0]
        if(v && v!=checkboxState) syncModelValueAndUI(v)
    }, [props.value, props.model?.[0]])


    useEffect(()=>{
        updateModelValue()
        if (checkboxState) checkboxInputEl.current!.checked = true
        else checkboxInputEl.current!.checked = false
    }, [checkboxState])


    const syncModelValueAndUI = (modelValue: T) => {
        console.log('1')
        if (props.binary) {
            setCheckboxState(modelValue == 1)
        } else {
            if (props.checkedValue) {
                setCheckboxState(modelValue == props.checkedValue)
            } else {
                setCheckboxState(modelValue as boolean)
            }
        }
    }


    const updateModelValue = ()=>{
        let valueToReturn;

        if(props.binary){
            valueToReturn = checkboxState ? 1 : 0
        } else {
            if(props.checkedValue){
                valueToReturn = checkboxState ? props.checkedValue : ''
            } else {
                valueToReturn = checkboxState
            }
        }

        props.onChange?.(valueToReturn as T)
        props.model?.[1]?.(valueToReturn as T)
    }


    const clicked = ()=> checkboxInputEl.current!.click()  



    return (
        <div className={['gamon-checkbox', props.className].join(" ")} onClick={clicked} style={checkboxStyleObject}>
            <input
                onChange={(e) => setCheckboxState(e.target.checked)}
                className="gamon-checkbox__input"
                ref={checkboxInputEl}
                type="checkbox"
                name={props.name}
                value={props.checkedValue}
            />
            <div className={['gamon-checkbox__checkmark', props.checkmarkClass, checkboxState ? 'gamon-checkbox__checkmark--checked' : ''].join(" ")} ref={checkmarkEl} style={checkmarkStyleObject}></div>
            <div className={['gamon-checkbox__title', props.titleClass].join(" ")} style={titleStyleObject}> {props.title} </div>
        </div>
    )

}

export default InputCheckbox