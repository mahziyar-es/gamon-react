import { prepareValueForStyleObject } from "../../utils"
import { useEffect, useRef, useState } from "react"
import '../../style/stepper.css'
import iconChevronUp from '../../assets/icon_chevron_up.png'
import iconChevronDown from '../../assets/icon_chevron_down.png'
import iconPlus from '../../assets/icon_plus.png'
import iconMinus from '../../assets/icon_minus.png'
import { StepperProps } from "../../types/stepper.type"







const Stepper = (props: StepperProps) => {


    const [number, setNumber] = useState(props.value || props.model?.[0] || 0)
    const [stepperStyleObject, setStepperStyleObject] = useState(props.style || {})
    const [incStyleObject, setIncStyleObject] = useState(props.incStyle || {})
    const [decStyleObject, setDecStyleObject] = useState(props.decStyle || {})
    const [numberStyleObject, setNumberStyleObject] = useState(props.numberStyle || {})
    const inputEl = useRef<HTMLInputElement>(null)




    useEffect(() => {
        if (props.min && props.min > number)
            setNumber(props.min)
        if (props.width)
            setStepperStyleObject(currObject => { return { ...currObject, width: prepareValueForStyleObject(props.width!) } })
        if (props.height)
            setStepperStyleObject(currObject => { return { ...currObject, height: prepareValueForStyleObject(props.height!) } })
    }, [])



    useEffect(() => {
        let output = Number(number)
        props.onChange?.(output)
        props.model?.[1]?.(output)
    }, [number])
    


    const op = (step: number) => {
        let nextNumber = Number(number)

        if (nextNumber == null || nextNumber == undefined)
            nextNumber = 0

        nextNumber += step

        if (props.min !== undefined && nextNumber < props.min)
            return
        if (props.max !== undefined && nextNumber > props.max)
            return

        setNumber(nextNumber)
    }

    

    const handleInput = (e: React.FormEvent) => {
        let inputValue = (e.target as HTMLInputElement)!.value as unknown
        setNumber(inputValue as number)
    }


    const handleInputFocusChange = () => {
        if (!props.editable) return
        
        let inputValue = Number(inputEl.current?.value)

        if (props.min !== undefined && inputValue < props.min)
            setNumber(props.min)
        else if (props.max !== undefined && inputValue > props.max)
            setNumber(props.max)
    }




    return (
        <div className={['gamon-stepper', props.vertical && 'gamon-stepper--vertical', props.className].join(" ")} style={stepperStyleObject}>
            <div onClick={()=>op(1)} className={['gamon-stepper__step gamon-stepper__step--inc', props.incClass].join(" ")} style={incStyleObject}>
                {props.chevron ? 
                    <img className="gamon-stepper__step__operation-image" src={iconChevronUp}></img>
                    :
                    <img className="gamon-stepper__step__operation-image" src={iconPlus}></img>
                }   
            </div>
            <div className={['gamon-stepper__number-container', props.numberClass].join(" ")} style={numberStyleObject}>
                { props.editable ?
                    <input value={number} onInput={handleInput} onBlur={handleInputFocusChange} type="number" className="gamon-stepper__number-container__editable-input" dir="ltr" ref={inputEl} />
                    :
                    <span> {number} </span>
                }
            </div>
            <div onClick={()=>op(-1)} className={['gamon-stepper__step gamon-stepper__step--dec', props.decClass].join(" ")} style={decStyleObject}>
                {props.chevron ? 
                    <img className="gamon-stepper__step__operation-image" src={iconChevronDown}></img>
                    :
                    <img className="gamon-stepper__step__operation-image" src={iconMinus}></img>
                }   
            </div>
        </div>
    )
    
}


export default Stepper