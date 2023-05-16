import { useEffect, useRef, useState } from "react"
import { InputToggleProps } from "../../types/inputToggle.type"
import '../../style/inputToggle.css'


const InputToggle = <T extends number|string|undefined,>(props:InputToggleProps<T>) => {
    
    const togglePointerEl = useRef<HTMLDivElement>(null)

    const [active, setActive] = useState(false)
    const [togglerStyleObject, setTogglerStyleObject] = useState(props.togglerStyle || {})
    const [pointerStyleObject, setPointerStyleObject] = useState(props.pointerStyle || {})
    const [defaultValueStyleObject, setDefaultValueStyleObject] = useState(props.pointerStyle || {})
    const [activeValueStyleObject, setActiveValueStyleObject] = useState(props.pointerStyle || {})



    useEffect(()=>{
        syncStateAndModelValue()
    }, [])


    useEffect(()=>{
        updateModelValue()
    }, [active])


    useEffect(() => {
        syncStateAndModelValue()
    }, [props.value , props.model?.[0]])
    

    const syncStateAndModelValue = () => {
        const value = props.value || props.model?.[0]

        if (value == props.activeValue[0]) setActive(true)
        else setActive(false)
    }


    const updateModelValue = () => {
        let output = active ? props.activeValue[0] : props.defaultValue[0]
        
        props.onChange?.(output as T)
        props.model?.[1]?.(output as T)
    }


    const toggle = () => setActive(prevState => ! prevState)



    return (
        <div className={['gamon-input-toggle', props.className, props.rectangle && 'gamon-input-toggle--rectangle'].join(" ")} style={props.style}>
            <div className={['gamon-input-toggle__default-value', props.defaultValueClass].join(" ")} style={defaultValueStyleObject}> {props.defaultValue[1]} </div>
            <div className={['gamon-input-toggle__toggler', props.togglerClass].join(" ")} onClick={toggle} style={togglerStyleObject}>
                <div className="gamon-input-toggle__toggler__pointer-container">
                    <div
                        className={['gamon-input-toggle__toggler__pointer-container__pointer', active && 'gamon-input-toggle__toggler__pointer-container__pointer--active', props.pointerClass].join(" ")}
                        ref={togglePointerEl}
                        style={pointerStyleObject}
                    ></div>
                </div>
            </div>
            <div className={['gamon-input-toggle__active-value', props.activeValueClass].join(" ")} style={activeValueStyleObject}> {props.activeValue[1]} </div>
        </div>
    )

   

}


export default InputToggle