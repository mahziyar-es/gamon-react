import { Calendar, CurrentCalendarPage, InputDateProps } from "../../../types/inputDate.type"
import { useEffect, useRef, useState } from "react"
import { fixedDigits, jalali_to_gregorian } from "../../../utils"
import InputLayout from "../InputLayout"
import Sheet from "../../Sheet/Sheet"
import Timepicker from "../Timepicker"
import { InputDateYearSection } from "./InputDateYearSection"
import { InputDateMonthSection } from "./InputDateMonthSection"
import { InputDateDaysSection } from "./InputDateDaysSection"
import '../../../style/inputDate.css'



const InputDate = (props:InputDateProps) => {
    
    const FORMAT_REGEX = /^(y{4}|m{1,2}|d{1,2})(([.\/-])(y{4}|m{1,2}|d{1,2}))?(([.\/-])(y{4}|m{1,2}|d{1,2}))?(\s(h{1,2}|m{1,2}|s{1,2}))?(:(h{1,2}|m{1,2}|s{1,2}))?(:(h{1,2}|m{1,2}|s{1,2}))?$/gm


    const datePickerSheetEl = useRef<Sheet>(null)
    const timepickerComponentEl = useRef<Timepicker>(null)
    const finalOutputFormat = useRef(props.format || 'yyyy/mm/dd hh:mm:ss')
    const finalOutputSeperator = useRef('/')
    const inputLocale = useRef(props.inputLocale || 'en-US')
    const outputLocale = useRef(props.outputLocale || inputLocale.current)
    const dateToBeUsedForProducingOutputFormat = useRef({
        year:0,
        month:0,
        day:0,
    })

    const [timepickerFormat, setTimepickerFormat] = useState('')
    const [timepickerFormatExtracted, setTimepickerFormatExtracted] = useState(false)
    const [datepickerParts, setDatepickerParts] = useState({
        y:false,
        m:false,
        d:false,
    })
    const [timepickerModel, setTimepickerModel] = useState('')

    const gregorian = useRef<Calendar>({
        monthNames : ['January','February','March','April','May','June','July','August','September','October','Novemeber','Decemeber'],
        weekDayNames : ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat'],
        weekDayNamesToFindOffset : ['Sun', 'Mon', 'Tue', 'Wed' , 'Thu', 'Fri', 'Sat'],
    })

    const jalali = useRef<Calendar>({
        monthNames : ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
        weekDayNames : ['ش', 'ی', 'د', 'س' , 'چ', 'پ', 'ج'],
        weekDayNamesToFindOffset : ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه' , 'چهارشنبه', 'پنجشنبه', 'جمعه'],
    })

    const [currentCalendarPage, setCurrentCalendarPage] = useState<CurrentCalendarPage>({
        year : 0,
        month : 0,
        monthNames : [],
        weekDayNames : [],
        weekDayNamesToFindOffset : [],
    })

    const [today, setToday] = useState({
        year:0,
        month:0,
        day:0,
        date:'',
    })

    const [finalOutput,setFinalOutput] = useState<string>('')

    const [selectedDate, setSelectedDate] = useState({
        year:0,
        month:0,
        day:0,
    })

    const modelValue = useRef(props.value || props.model?.[0])



    useEffect(()=>{
        processFormat()
        init()
    }, [])


    useEffect(() => {
        if(props.defaultToday && !modelValue.current) updateSelectedDate(today.year, today.month, today.day)
    }, [today])


    useEffect(() => {
        const v = (props.value || props.model?.[0]) as string
        if (v != finalOutput) {
            modelValue.current = v
            processModelValue(v)
        }
    }, [props.value, props.model?.[0]])



    const processFormat = ()=>{

        if(finalOutputFormat.current && finalOutputFormat.current.match(FORMAT_REGEX)){
            let finalOutputFormatParts = finalOutputFormat.current.split(" ")
            let finalOutputFormatDate = finalOutputFormatParts[0]
            setTimepickerFormat(finalOutputFormatParts[1])

            // process date 
            let sepSlash = finalOutputFormatDate.split('/').length - 1
            let sepDash = finalOutputFormatDate.split('-').length - 1
            let sepDot = finalOutputFormatDate.split('.').length - 1

            if(sepSlash > 0 && sepDash == 0 && sepDot == 0) finalOutputSeperator.current = "/"
            else if(sepDash > 0 && sepSlash == 0 && sepDot == 0) finalOutputSeperator.current = "-"
            else if (sepDot > 0 && sepSlash == 0 && sepDash == 0) finalOutputSeperator.current = "."
            else finalOutputSeperator.current = "/"
        } 
        else {
            finalOutputFormat.current = 'yyyy/mm/dd hh:mm:ss'
            setDatepickerParts({y:true, m:true, d:true})
        }

        setTimepickerFormatExtracted(true)
    }


    const init = ()=>{

        // initiating the calendar page with today date with toLocaleDateString data
        let todayDate = new Date()
        const year = parseInt(todayDate.toLocaleDateString(inputLocale.current, {year: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))  );
        const month = parseInt(todayDate.toLocaleDateString(inputLocale.current, {month: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))  );
        const day = parseInt(todayDate.toLocaleDateString(inputLocale.current, {day: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728))  );
        const date = year+'/'+month+'/'+day

        setToday({
            year:year,
            month:month,
            day:day,
            date:date,
        })

        setCurrentCalendarPage(prevState => ({
            ...prevState,
            year: year,
            month: month,
        }))

        // selecting the correct month and weekday names based on locale
        if (inputLocale.current == 'fa-IR') {
            setCurrentCalendarPage(prevState => ({
                ...prevState,
                monthNames: jalali.current.monthNames,
                weekDayNames: jalali.current.weekDayNames,
                weekDayNamesToFindOffset: jalali.current.weekDayNamesToFindOffset,
            }))
        } else {
            setCurrentCalendarPage(prevState => ({
                ...prevState,
                monthNames: gregorian.current.monthNames,
                weekDayNames: gregorian.current.weekDayNames,
                weekDayNamesToFindOffset: gregorian.current.weekDayNamesToFindOffset,
            }))
        }
    }


    const processModelValue = (modelValue: string)=>{
        let datetimeFormatRegex = /^(\d{4}|\d{1,2})(([.\/-])(\d{4}|\d{1,2}))?(([.\/-])(\d{4}|\d{1,2}))?(\s(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?$/gm


        if (modelValue && modelValue.match(datetimeFormatRegex)) {
            let modelValueParts = modelValue.split(" ")
            let modelValueDate = modelValueParts[0]
            setTimepickerModel(modelValueParts[1])

            let outputFormatParts = finalOutputFormat.current.split(" ")
            let outputFormatDate = outputFormatParts[0]
            setTimepickerFormat(outputFormatParts[1])

            setSelectedDateFromModelValue(outputFormatDate, modelValueDate)
        } else if (!modelValue) {
            clear(false)
        }
    }


    const setSelectedDateFromModelValue = (formatDate:string, modelValueDate:string)=>{
       
        let dateFormatParts =  formatDate.split(finalOutputSeperator.current)
        let modelValueDateParts =  modelValueDate.split(finalOutputSeperator.current)

        let year: number = 0;
        let month: number = 0;
        let day: number = 0;

        
        dateFormatParts.forEach((formatPart, index)=>{
            let yearDigits = formatPart.split('y').length - 1
            let monthDigits = formatPart.split('m').length - 1
            let dayDigits = formatPart.split('d').length - 1

            if(yearDigits > 0) year = parseInt(modelValueDateParts[index])
            else if(monthDigits > 0) month = parseInt(modelValueDateParts[index])
            else if(dayDigits > 0) day = parseInt(modelValueDateParts[index])
        })
        
        if (year != 0) {
            setCurrentCalendarPage(prevState=>({...prevState, year: year}))
        } 
        if (month != 0) {
            setCurrentCalendarPage(prevState=>({...prevState, month: month}))
        } 
        // if (day != 0) setSelectedDateUI(prevState => ({ ...prevState, day: day }))

        updateSelectedDate(year,month,day, false)
    }


    const goToToday = ()=> setCurrentCalendarPage(prevState=>({...prevState, year: today.year, month: today.month}))
    


    const clear = (updateOutput = true) => {
        updateSelectedDate(0,0,0, updateOutput)
        timepickerComponentEl.current?.clear()
    }

    const openDatepickerSheet = ()=> datePickerSheetEl.current?.toggle()
    

    const changeMonthHandler = (month:number) => {
        if(month > 12){
            month = 1
            setCurrentCalendarPage(prevState=>({ ...prevState, year: prevState.year + 1 }))
        }
        else if(month < 1){
            month = 12
            setCurrentCalendarPage(prevState=>({ ...prevState, year: prevState.year - 1 }))
        }

        setCurrentCalendarPage(prevState=>({ ...prevState, month: month }))
    }


    const changeYearHandler = (year:number) => {
        setCurrentCalendarPage(prevState=>({...prevState, year: year}))
    }
    

    const daySelectionHandler = (day: number) => {
        updateSelectedDate(currentCalendarPage.year, currentCalendarPage.month, day)
    }


    // ==================================================================================
    // ================================= producing output ===============================
    // ==================================================================================


    const updateSelectedDate = (year = 0, month = 0, day = 0, updateOutput = true) => {
        setSelectedDate({ year: year, month: month, day: day })
    }

    useEffect(() => {
        produceOutput()
    }, [selectedDate, timepickerModel])


    const produceOutput = async () => {
        let output = await formatDate()

        if(timepickerFormat && output)
            output += ' '+ timepickerModel

        setFinalOutput(output)
    }


    const formatDate = () : string =>{

        let _dateOutput = ''

        if (selectedDate.year == 0 && selectedDate.month == 0 && selectedDate.day == 0) // to ensure empty output when component mounts
            return _dateOutput

        let outputFormatParts = finalOutputFormat.current.split(" ")
        let outputFormatDate = outputFormatParts[0]
        setTimepickerFormat( outputFormatParts[1] )


        dateToBeUsedForProducingOutputFormat.current.year = selectedDate.year
        dateToBeUsedForProducingOutputFormat.current.month = selectedDate.month
        dateToBeUsedForProducingOutputFormat.current.day = selectedDate.day


        if(inputLocale.current == 'fa-IR' && outputLocale.current == 'en-US' ){
            if(selectedDate.year != 0 && selectedDate.month != 0 && selectedDate.day != 0){
                [dateToBeUsedForProducingOutputFormat.current.year, dateToBeUsedForProducingOutputFormat.current.month, dateToBeUsedForProducingOutputFormat.current.day]
                    = jalali_to_gregorian(selectedDate.year, selectedDate.month, selectedDate.day)
            }
        }


        let fromatDateParts = outputFormatDate.split(finalOutputSeperator.current)
        
        if(fromatDateParts[0]) _dateOutput = produceFormatPartOutput(fromatDateParts[0])
        if(fromatDateParts[1]) _dateOutput += finalOutputSeperator.current + produceFormatPartOutput(fromatDateParts[1])
        if(fromatDateParts[2]) _dateOutput += finalOutputSeperator.current + produceFormatPartOutput(fromatDateParts[2])
        
        return _dateOutput
    }


    const produceFormatPartOutput = (part:string)=>{
        let yearDigits = part.split('y').length - 1
        let monthDigits = part.split('m').length - 1
        let dayDigits = part.split('d').length - 1

        let partOutput = ''

        if(yearDigits > 0) partOutput = fixedDigits(dateToBeUsedForProducingOutputFormat.current.year, yearDigits)
        else if(monthDigits > 0) partOutput = fixedDigits(dateToBeUsedForProducingOutputFormat.current.month, monthDigits)
        else if(dayDigits > 0) partOutput = fixedDigits(dateToBeUsedForProducingOutputFormat.current.day, dayDigits)

        return partOutput
    }

    useEffect(() => {
        props.onChange?.(finalOutput)
        props.model?.[1]?.(finalOutput)
    }, [finalOutput] )


    

    
    return (
        <InputLayout title={props.title} icon={props.icon} className={props.className} style={props.style}>
            <input onClick={openDatepickerSheet} className="gamon-input__input" value={finalOutput} placeholder={props.placeholder} readOnly  />

            <Sheet ref={datePickerSheetEl} type={'center'} width={300}>
                <div className="gamon-input-date">

                    <div>
                        <div className="gamon-input-date__year-month-container">
                            <InputDateYearSection calendarYear={currentCalendarPage.year} onChange={(year) => changeYearHandler(year)} />
                            <InputDateMonthSection currentCalendarPage={currentCalendarPage} onChange={(month)=>changeMonthHandler(month)}  />
                        </div>


                        <div className="gamon-input-date__days-table-container">
                            <InputDateDaysSection
                                selectedDate={selectedDate}
                                today={today}
                                currentCalendarPage={currentCalendarPage}
                                inputLocale={inputLocale.current}
                                onChange={(day)=>daySelectionHandler(day)}
                            />
                        </div>

                        {timepickerFormatExtracted && timepickerFormat &&
                            <Timepicker
                                model={[timepickerModel, setTimepickerModel]}
                                format={timepickerFormat}
                                hourType={props.timepickerHourType}
                                ref={timepickerComponentEl}
                            />
                        }
                    </div>

                    <div className="gamon-input-date__bottom-buttons">
                        <div onClick={goToToday} className="gamon-input-date__bottom-buttons__today-button">Today</div>
                        <div onClick={openDatepickerSheet} className="gamon-input-date__bottom-buttons__done-button">Done</div>
                        <div onClick={clear} className="gamon-input-date__bottom-buttons__clear-button">Clear</div>
                    </div>

                </div>
            </Sheet>
    </InputLayout>
    )

}

export default InputDate