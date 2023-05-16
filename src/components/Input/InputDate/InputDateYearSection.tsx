import iconChevronLeft from '../../../assets/icon_chevron_left.png'
import iconChevronRight from '../../../assets/icon_chevron_right.png'



interface InputDateYearSectionProps {
    onChange : (val:number)=>void,
    calendarYear: number,
}

const InputDateYearSection = (props: InputDateYearSectionProps) => {


    const changeYear = (step:number)=>{
        let year = props.calendarYear + step
        props.onChange(year)
    }


    return (
        <div className="gamon-input-date__year-month-container__year-picker">
            <img onClick={()=>changeYear(-1)} src={iconChevronLeft} />
            <h4 className="gamon-input-date__year-month-container__year-picker__year">{ props.calendarYear }</h4>
            <img onClick={()=>changeYear(1)} src={iconChevronRight} /> 
        </div>
    )
}


export {InputDateYearSection}