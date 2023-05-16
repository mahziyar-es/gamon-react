import React, { useEffect, useRef, useState } from "react";
import { InputRangeProps } from "../../types/inputRange.type";
import '../../style/inputRange.css'


const InputRange = <T extends number|number[]|undefined ,>(props:InputRangeProps<T>) => {
    

    const [modelValue, setModelValue] = useState<T>()
    const [minValue] = useState(props.min || 0)
    const [maxValue] = useState(props.max || 100)
    const [rangeOneValue, setRangeOneValue] = useState<number>(minValue)
    const [rangeTwoValue, setRangeTwoValue] = useState<number>(maxValue)
    const [outputOneLeft, setOutputOneLeft] = useState('')
    const [outputTwoLeft, setOutputTwoLeft] = useState('')
    const [pickedRangeWidth, setPickedRangeWidth] = useState('')
    const [pickedRangeLeft, setPickedRangeLeft] = useState('')
    const fullRangeWidth = useRef(maxValue - minValue)



    useEffect(()=>{
        processModelValue()
    }, [])


    useEffect(() => {
        updateUI()
        updateModelValue()
    }, [rangeOneValue, rangeTwoValue])


    const processModelValue = () => {
        const value = props.value || props.model?.[0]

        if (value == null || value == undefined) return 
            
        if (typeof (value) == 'number')
            setRangeOneValue(value)
        else {
            setRangeOneValue(value[0])
            setRangeTwoValue(value[1])
        }
    }


    const handleInputChange = (e: React.FormEvent) => {

        const inputName = (e.target as HTMLInputElement)?.name 
        const inputValue = Number((e.target as HTMLInputElement)?.value)

        if(props.double && ( (inputValue >= rangeTwoValue && inputName == 'rangeOne') || (inputValue <= rangeOneValue && inputName == 'rangeTwo')  ) ){
            e?.stopPropagation()
            return
        }
        
        if(inputName == 'rangeOne') setRangeOneValue(inputValue)
        else if(inputName == 'rangeTwo') setRangeTwoValue(inputValue)
    }


    const updateUI = async ()=>{

        setOutputOneLeft( ( (rangeOneValue - minValue) / fullRangeWidth.current) * 100 + '%' )
        setOutputTwoLeft( ( (rangeTwoValue - minValue) / fullRangeWidth.current) * 100 + '%' )

        let [pickedRangeLeft, pickedRangeWidth] = await calcPickedRangeLeftPositionAndWidth()
        setPickedRangeLeft(pickedRangeLeft)
        setPickedRangeWidth(pickedRangeWidth)
    }


    const calcPickedRangeLeftPositionAndWidth = async () => {
        let pickedRangeLeft, pickedRangeWidth;

        if(props.double){
            if(rangeOneValue > rangeTwoValue){
                pickedRangeWidth =  (rangeOneValue - rangeTwoValue) / fullRangeWidth.current * 100 + '%'
                pickedRangeLeft =  ( (rangeTwoValue - minValue) / fullRangeWidth.current ) * 100 + '%'
            }
            else{
                pickedRangeWidth =  (rangeTwoValue - rangeOneValue) / fullRangeWidth.current * 100 + '%'
                pickedRangeLeft =  ( (rangeOneValue - minValue) / fullRangeWidth.current ) * 100 + '%'
            }
        } else {
            pickedRangeWidth = (rangeOneValue - minValue) / fullRangeWidth.current * 100 + '%'
            pickedRangeLeft = 0+'%'
        }

        return [pickedRangeLeft, pickedRangeWidth]
    }

  
    const updateModelValue = () => {
        const output = props.double ? [rangeOneValue, rangeTwoValue] : rangeOneValue

        props.onChange?.(output as T)
        props.model?.[1]?.(output as T)
    }




    return (
        <div className={['gamon-input-range', props.className].join(" ")} style={props.style}>

            { props.outputDisplay == 'up' &&
                <span  className={['gamon-input-range__output', props.outputOneClass].join(" ")}
                    style={{ left: outputOneLeft, ...props.outputOneStyle }}>{rangeOneValue}</span>
            }

            { props.double && props.outputDisplay == 'up' && 
                <span className={['gamon-input-range__output gamon-input-range__output--output-two', props.outputTwoClass].join(" ")}
                    style={{ left: outputTwoLeft , ...props.outputTwoStyle }} >{rangeTwoValue}</span>
            } 
            

            <span className={['gamon-input-range__full-range', props.fullRangeClass].join(" ")}
                style={props.fullRangeStyle}></span>
            <span className={['gamon-input-range__selected-range', props.selectedRangeClass].join(" ")}  
                style={{width: pickedRangeWidth, left: pickedRangeLeft, ...props.selectedRangeStyle }}></span>

            

            <input value={rangeOneValue} onInput={handleInputChange} min={minValue} max={maxValue} step={props.step} type="range" name="rangeOne"
                className={['gamon-input-range__input gamon-input-range__input--input-one', props.inputOneClass].join(" ")} style={props.inputOneStyle} />
            
            { props.double &&
                <input value={rangeTwoValue} onInput={handleInputChange}  min={minValue} max={maxValue} step={props.step} type="range"  name="rangeTwo"
                    className={['gamon-input-range__input gamon-input-range__input--input-two', props.inputTwoClass].join(" ")} style={props.inputTwoStyle} />
            }
            

        </div>
    )


}


export default InputRange