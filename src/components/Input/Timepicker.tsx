import { TimepickerProps } from "../../types/timepicker.type"
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { fixedDigits, getTimestamp } from "../../utils"
import Stepper from "../Stepper/Stepper"
import InputToggle from "./InputToggle"
import '../../style/timepicker.css'


type Timepicker = {
    clear:()=>void,
}

const Timepicker = forwardRef((props: TimepickerProps, ref) => {
    
    const FORMAT_REGEX = /^(h{1,2}|m{1,2}|s{1,2})?(:(h{1,2}|m{1,2}|s{1,2}))?(:(h{1,2}|m{1,2}|s{1,2}))?$/gm

    const finalFormat = useRef(props.format || 'hh:mm:ss')
    const finalOutput = useRef('')
    const timepickerEl = useRef<HTMLDivElement>(null)

    const [timepickerHourType] = useState(props.hourType || '24')
    const [timepickerParts, setTimepickerParts] = useState({
        h : false,
        m : false,
        s : false,
    })
    const [timepicker, setTimepicker] = useState({
        hour:0,
        minute:0,
        second:0,
    })
    const [dayTime, setDayTime] = useState('AM')
    const [steppersKey, setSteppersKey] = useState(getTimestamp())



    useEffect(()=>{
        determineFormat()
        processModelValue()
    }, [])


    useEffect(()=>{
        produceOutput()
    }, [timepicker.hour, timepicker.minute, timepicker.second, dayTime])


    const determineFormat = () => {
        if(finalFormat.current.match(FORMAT_REGEX) ){
            if (finalFormat.current.includes('h'))
                setTimepickerParts(prevState=> ({...prevState, h:true}))
            if(finalFormat.current.includes('m'))
                setTimepickerParts(prevState=> ({...prevState, m:true}))
            if(finalFormat.current.includes('s'))
                setTimepickerParts(prevState=> ({...prevState, s:true}))
        } else {
            finalFormat.current = 'hh:mm:ss'
            setTimepickerParts({h:true, m:true, s:true})
        }
    }
    

    const processModelValue = () => {
        const value = props.value || props.model?.[0]

        if(!value) return

        let timeFormatParts =  finalFormat.current.split(":")
        let modelValueTimeParts =  value.split(":")
        
        timeFormatParts.forEach((formatPart, index) => {

            let hourDigits = formatPart.split('h').length - 1
            let minuteDigits = formatPart.split('m').length - 1
            let secondDigits = formatPart.split('s').length - 1

            const partValue = parseInt(modelValueTimeParts[index])

            if (hourDigits > 0) setTimepicker(prevState => ({...prevState, hour: partValue }) )
            else if (minuteDigits > 0) setTimepicker(prevState => ({...prevState, minute: partValue }) )
            else if (secondDigits > 0) setTimepicker(prevState => ({ ...prevState, second: partValue }))
        })
    }


    const produceOutput = ()=>{
        const formatParts = finalFormat.current.split(":")

        finalOutput.current = ''

        if(formatParts[0]) finalOutput.current += " "+produceOutputBasedOnFormatPart(formatParts[0])
        if(formatParts[1]) finalOutput.current += ":" + produceOutputBasedOnFormatPart(formatParts[1])
        if (formatParts[2]) finalOutput.current += ":" + produceOutputBasedOnFormatPart(formatParts[2])
        
        if (props.hourType == '12') finalOutput.current += ' ' + dayTime
        
        updateModelValue()
    }



    const produceOutputBasedOnFormatPart = (part:string)=>{
        let hourDigits = part.split('h').length - 1
        let minuteDigits = part.split('m').length - 1
        let secondDigits = part.split('s').length - 1

        let partOutput = ''
        
        if(hourDigits > 0) partOutput = fixedDigits(timepicker.hour, hourDigits)
        else if(minuteDigits > 0) partOutput = fixedDigits(timepicker.minute, minuteDigits)
        else if(secondDigits > 0) partOutput = fixedDigits(timepicker.second, secondDigits)
        
        return partOutput
    }


    const clear = ()=>{
        timepicker.hour = 0
        timepicker.minute = 0
        timepicker.second = 0
        setSteppersKey(getTimestamp())
    }


    const updateModelValue = ()=>{
        props.onChange?.(finalOutput.current)
        props.model?.[1]?.(finalOutput.current)
    }   

    const handleTimepickerSlotChange = (val: number, slot: string) => {
        setTimepicker(prevState =>(  {...prevState, [slot]: val }  ))
    }



    useImperativeHandle(ref, () => ({
        clear
    }))


    return (
        <>
            <div className="gamon-timepicker" ref={timepickerEl}>

                { timepickerParts.h &&
                    <div className="gamon-timepicker__slot">
                        <Stepper value={timepicker.hour} onChange={(val)=>handleTimepickerSlotChange(val, 'hour')} min={0} max={24} key={steppersKey} editable vertical chevron />
                    </div>
                }
                

                { timepickerParts.h && (timepickerParts.m || timepickerParts.s) &&
                    <span> : </span>
                }

                { timepickerParts.m &&
                    <div className="gamon-timepicker__slot">
                        <Stepper value={timepicker.minute} onChange={(val)=>handleTimepickerSlotChange(val, 'minute')} min={0} max={60} key={steppersKey} editable vertical chevron />
                    </div>
                }
                
                { timepickerParts.m && timepickerParts.s &&
                    <span> : </span>
                }

                { timepickerParts.s &&
                    <div className="gamon-timepicker__slot">
                        <Stepper value={timepicker.second} onChange={(val)=>handleTimepickerSlotChange(val, 'second')} min={0} max={60} key={steppersKey} editable vertical chevron />
                    </div>
                }
                
            </div>

            { timepickerHourType == '12' && 
                <div className="gamon-timepicker__daytime-toggler">
                    <InputToggle model={[dayTime, setDayTime]} defaultValue={['AM', 'AM']} activeValue={['PM', 'PM']} />
                </div>
            }
            
        </>
    )
})


export default Timepicker