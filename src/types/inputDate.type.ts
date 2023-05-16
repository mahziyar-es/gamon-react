

interface InputDateProps {
    model ?: [string, (val:string)=>void],
    value ?: string,
    onChange ?: (val:string)=>void,
    

    title ?: string,
    icon ?: string,
    placeholder ?: string,
    format ?: string,
    inputLocale ?: string,
    outputLocale ?: string,
    timepicker ?: boolean,
    timepickerHourType?: string,
    defaultToday?: boolean,

    className?: string,
    style?: {[index:string]: string},
}

type Calendar = {monthNames: string[], weekDayNames: string[], weekDayNamesToFindOffset: string[]}

type CurrentCalendarPage = {
    year:number,
    month:number,
    monthNames: string[],
    weekDayNames: string[],
    weekDayNamesToFindOffset: string[],
}


type TodayDate = {
    year:number,
    month:number,
    day:number,
    date:string,
}

type SelectedDate = {
    year:number,
    month:number,
    day:number,
}

export {InputDateProps, Calendar, CurrentCalendarPage, TodayDate, SelectedDate}