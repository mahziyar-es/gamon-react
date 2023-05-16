import { CurrentCalendarPage, SelectedDate, TodayDate } from "../../../types/inputDate.type";
import { useEffect, useState } from "react";
import { jalali_to_gregorian } from "../../../utils";

interface InputDateDaysSectionProps{
    selectedDate : SelectedDate,
    today : TodayDate,
    currentCalendarPage : CurrentCalendarPage,
    inputLocale: string,
    
    onChange : (value:number)=>void,
}


const InputDateDaysSection = (props:InputDateDaysSectionProps) => {

    const [daysTableArray, setDaysTableArray] = useState<(number|string)[][]>([])

    useEffect(() => {
        getDays()
    }, [props.currentCalendarPage.year, props.currentCalendarPage.month])
    

    const getDays = ()=>{

        let [offset, monthDaysCount] = calcMonthDaysOffsetAndCount()
        let day = 1;
        let daysArray : ((number|string)[])[] = []

        for(let row=0; row<6; row++){ // 5 rows of days
            let rowDaysArray : (number|string)[] = []

            for(let col=0; col<7; col++){ // each row has 7 cols
                if(row == 0 ){
                    if(col < offset)
                        rowDaysArray.push('')
                    else{
                        rowDaysArray.push(day)
                        day++
                    }

                } else {
                    if(day > monthDaysCount)
                        break;

                    rowDaysArray.push(day)
                    day++
                    

                }
            }
            daysArray.push(rowDaysArray)
        }
        
        setDaysTableArray(daysArray)
    }


    const calcMonthDaysOffsetAndCount = ()=>{
        let firstDayOfMonthGregorian = null
        let lastDayOfMonthGregorian = null

        let yearForLastDayOfMonth = props.currentCalendarPage.month == 12 ? props.currentCalendarPage.year+1 : props.currentCalendarPage.year
        let monthForLastDayOfMonth = props.currentCalendarPage.month == 12 ? 1 : props.currentCalendarPage.month+1



        if(props.inputLocale == 'fa-IR'){
            firstDayOfMonthGregorian = jalali_to_gregorian( props.currentCalendarPage.year, props.currentCalendarPage.month, 1)
            lastDayOfMonthGregorian = jalali_to_gregorian( yearForLastDayOfMonth , monthForLastDayOfMonth, 0)
        } else {
            firstDayOfMonthGregorian = [props.currentCalendarPage.year, props.currentCalendarPage.month, 1]
            lastDayOfMonthGregorian = [yearForLastDayOfMonth, monthForLastDayOfMonth, 0]
        }


        let firstDayOfMonth = new Date(firstDayOfMonthGregorian[0],  firstDayOfMonthGregorian[1]-1 , firstDayOfMonthGregorian[2])
            .toLocaleDateString(props.inputLocale, {weekday: 'short'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
        let offset = props.currentCalendarPage.weekDayNamesToFindOffset.indexOf(firstDayOfMonth)


        let lastDayOfMonth = new Date(lastDayOfMonthGregorian[0],  lastDayOfMonthGregorian[1]-1, lastDayOfMonthGregorian[2])
            .toLocaleDateString(props.inputLocale, {day: 'numeric'}).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));
        let monthDaysCount = parseInt(lastDayOfMonth);


        return [offset, monthDaysCount]
    }


    const daySelection = (day: number | string) => {
        if (!day) return
        props.onChange(day as number)
    }
    

  

    return (
        <>
            <div className="gamon-input-date__days-table-container__weekday-names-container" >
                { props.currentCalendarPage.weekDayNames.map((weekDayName, index)=>(
                    <div  key={index} className="gamon-input-date__days-table-container__weekday-names-container__name">
                        {weekDayName}
                    </div>
                ))}
            </div>

            
            {daysTableArray.map((row, index) => (
                <div key={index+'row'} className="gamon-input-date__days-table-container__days-table" >
                    {row.map((day, dayIndex) => (
                        <div
                            key={dayIndex}
                            onClick={() => daySelection(day) }
                            className={['gamon-input-date__days-table-container__days-table__day',
                                !day && 'gamon-input-date__days-table-container__days-table__day--empty',
                                props.today.date == props.currentCalendarPage.year + '/' + props.currentCalendarPage.month + '/' + day && 'gamon-input-date__days-table-container__days-table__day--today',
                                props.selectedDate.year + '/' + props.selectedDate.month + '/' + props.selectedDate.day == props.currentCalendarPage.year + '/' + props.currentCalendarPage.month + '/' + day && 'gamon-input-date__days-table-container__days-table__day--selected',
                            ].join(" ")}
                        >
    
                            {day}
                        </div>
                    ))}
                </div>
            ))}
            

        </>
    )
}


export {InputDateDaysSection}