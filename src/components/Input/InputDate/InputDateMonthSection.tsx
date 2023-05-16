import { CurrentCalendarPage } from "../../../types/inputDate.type"
import { useState } from "react"
import iconChevronLeft from '../../../assets/icon_chevron_left.png'
import iconChevronRight from '../../../assets/icon_chevron_right.png'
import Sheet from "../../../components/Sheet/Sheet"
import { ToggleAnimations } from "../../../types/general.type"


interface InputDateMonthSectionProps {
    currentCalendarPage: CurrentCalendarPage,
    onChange : (value:number)=>void,
}

const InputDateMonthSection = (props: InputDateMonthSectionProps) => {

    const [showMonthsSelectionPage, setShowMonthsSelectionPage] = useState(false)


    const toggleMonthSelectionPage = ()=> setShowMonthsSelectionPage(prevState=> !prevState)
    

    const monthSelection = (monthIndex : number) : void =>{
        let month = monthIndex+1
        toggleMonthSelectionPage()
        props.onChange(month)
    }


    const changeMonth = (step:number)=>{
        let month = props.currentCalendarPage.month + step
        props.onChange(month)
    }



    return (
        <>
                    
            <div className="gamon-input-date__year-month-container__month-picker">
                <img onClick={()=>changeMonth(-1)} src={iconChevronLeft} />
                <h4 onClick={toggleMonthSelectionPage} className="gamon-input-date__year-month-container__month-picker__month" >{ props.currentCalendarPage.monthNames[props.currentCalendarPage.month - 1] } ( {props.currentCalendarPage.month} )</h4>
                <img onClick={()=>changeMonth(1)} src={iconChevronRight} />
            </div>


            <Sheet displayModel={ [showMonthsSelectionPage, setShowMonthsSelectionPage] } animation={'scale'} >
                <div className = "gamon-input-date__year-month-container__months-selection-page" >
                    {
                        props.currentCalendarPage.monthNames.map((month, index) => (
                            <div  onClick={()=>monthSelection(index)} key={index} className="gamon-input-date__year-month-container__months-selection-page__month">
                                {month}
                            </div>
                        ))
                    }
                </div>
            </Sheet>
            
        </>

    )
}


export {InputDateMonthSection}