import { toggleAnimation } from "../../utils"
import React, { useEffect, useRef, useState } from "react"
import { InputSelectProps } from "../../types/inputSelect.type"
import Sheet from "../Sheet/Sheet"
import InputLayout from "./InputLayout"
import iconDeleteCircular from '../../assets/icon_delete_circular.png'
import '../../style/inputSelect.css'
import { SheetProps } from "../../types/sheet.type"

type SheetTypes = SheetProps['type']

const InputSelect = <T extends string|number| (string|number)[] ,>(props:InputSelectProps<T>) => {

    type SelectedValuesSingle = string | number;
    type SelectedValuesMulti = (string | number)[];
    
    type  SelectedOptionSingle = (string|number)[];
    type  SelectedOptionMulti = ((string|number)[])[];

    const optionsDropDownContainer = useRef<HTMLDivElement>(null)
    const optionsDisplayType = useRef(props.displayType || 'dropdown')
    const optionsSheetContainerInstance = useRef<Sheet>(null)
    const optionsAreVisible = useRef(false)

    const [placeholder, setPlaceholder] = useState('')
    const [optionSheetContainerType, setOptionSheetContainerType] = useState<SheetTypes>('center')
    const [selectedOption, setSelectedOption] = useState<SelectedOptionSingle | SelectedOptionMulti>([])
    const [selectedValues, setSelectedValues] = useState< SelectedValuesSingle | SelectedValuesMulti>([])



    useEffect(() => {
        processModelValue()
        determineOptionsSheetContainerType()
        determinePlaceholder()

        window.addEventListener('click', generalClickHandler)
        return ()=>window.removeEventListener('click', generalClickHandler)
    }, [])


    useEffect(() => {
        const v = props.value || props.model?.[0]
        if(v != selectedValues) processModelValue(v)
    }, [props.value, props.model?.[0]])
    

  
    const processModelValue = (modelValue?: T) => {
        if (modelValue && props.options) {
            if (props.multi) {
                props.options.forEach((op)=>{
                    if ((modelValue as (string|number)[]).indexOf(op[0]) != -1) 
                        optionSelection(op!)
                })
            } else {
                props.options.forEach((op)=>{
                    if (op[0] == modelValue) 
                        optionSelection(op!)
                })
            }
        } else {
            clear()
        }
    }


    const determineOptionsSheetContainerType = () => {
        if(optionsDisplayType.current == 'sheet-bottom') setOptionSheetContainerType('bottom')
        else if(optionsDisplayType.current == 'sheet-center') setOptionSheetContainerType('center')
    }


    const determinePlaceholder = () => {
        let placeholder = ''

        if (props.multi) placeholder = selectedOption.length == 0 ? props.placeholder || '' : ''
        else placeholder = !(selectedOption && selectedOption[1]) ? props.placeholder || '' : ''

        setPlaceholder(placeholder)
    }


    const toggle = (e: MouseEvent | React.MouseEvent) => {
        e.stopPropagation();

        if(optionsDisplayType.current == 'dropdown'){
            toggleAnimation(optionsDropDownContainer.current!, ()=>{
                optionsAreVisible.current = ! optionsAreVisible.current
            })
        } else if (optionsDisplayType.current == 'sheet-bottom' || optionsDisplayType.current == 'sheet-center') {
            if(optionsAreVisible.current) optionsSheetContainerInstance.current?.hide()
            else optionsSheetContainerInstance.current?.show()

            optionsAreVisible.current = ! optionsAreVisible.current
        }
    }



    

    const optionSelection = (val:any)=>{
        if (props.multi) {
            if ((selectedValues as SelectedValuesMulti).indexOf(val[0]) == -1) {
                setSelectedValues(prevState=>( [...(prevState as SelectedValuesMulti), val[0]]  ))
                setSelectedOption(prevState=>( [...prevState, val]  ))
            }
            else {
                const indexToRemove = (selectedValues as SelectedValuesMulti).indexOf(val[0])
                removeSelectedItem(indexToRemove)
            }
        } else {
            setSelectedOption(val)
            setSelectedValues(val[0])
        }
    }


    const removeSelectedItem = (index:number, event ?: React.MouseEvent)=>{
        if(event)
            event.stopPropagation()

        setSelectedValues(prevState => {
            return (prevState as SelectedValuesMulti).filter((val, i)=> i != index )
        })
        setSelectedOption(prevState => {
            return (prevState as SelectedOptionMulti).filter((val, i)=> i != index )
        })
    }


    const generalClickHandler = (e:MouseEvent)=>{
        if(optionsAreVisible.current) toggle(e)
    }


    const clear = () => {
        const clearedValue = props.multi ? [] : ''
        setSelectedValues(clearedValue)
        setSelectedOption([])
    }


    useEffect(() => {
        determinePlaceholder()
        props.onChange?.(selectedValues as T)
        props.model?.[1]?.(selectedValues as T)
    }, [selectedValues])

    
    


    return (
        <InputLayout title={props.title} icon={props.icon} onClick={toggle} className={props.className} style={props.style}> 

            {placeholder ? (
                <input placeholder={placeholder} className="gamon-input__input" readOnly />

            ) : (
                <div className="gamon-input__input">
                    {props.multi ?
                        (
                            <div className="gamon-input-select__multi-selected-items-container">
                                {(selectedOption as SelectedOptionMulti).map((selected, index) => (
                                    <span key={index} onClick={(e)=>removeSelectedItem(index, e)} className="gamon-input-select__multi-selected-items-container__selected-item">
                                        <img className="gamon-input-select__multi-selected-items-container__selected-item__remove-button" src={iconDeleteCircular} />
                                        <span className="gamon-input-select__multi-selected-items-container__selected-item__text">{ selected[1] }</span>
                                    </span>
                                ))}
                            </div>
                        )
                        :
                        (
                            <div>
                                {selectedOption && selectedOption[1] &&
                                    <span >{selectedOption[1]}</span>
                                }
                            </div>
                        )
                    }
                </div>
            )}


            <div className="gamon-display-toggle gamon-display-toggle--animation-slide-down" ref={optionsDropDownContainer}>
                <div className="gamon-input-select__options-container dta-child dta-animated">
                    {props.options?.map((op, index) => (
                        <div
                            key={index}
                            onClick={() => optionSelection(op)}
                            className={['gamon-input-select__options-container__option', op[0] == selectedOption[0] ? 'gamon-input-select__options-container__option--selected' : ''].join(" ")}
                        >
                            {op[1]}
                        </div>
                    ))}
                </div>
            </div>
                
            {optionSheetContainerType &&
                <Sheet
                    ref={optionsSheetContainerInstance}
                    type={optionSheetContainerType}
                    dismissDisabled
                >
                    {props.options?.map((op, index) => (
                        <div
                            key={index}
                            onClick={() => optionSelection(op)}
                            className={['gamon-input-select__options-container__option', op[0] == selectedOption[0] ? 'gamon-input-select__options-container__option--selected' : ''].join(" ")}
                        >
                            {op[1]}
                        </div>
                    ))}
                </Sheet>
            }
                

        </InputLayout>
    )


}


export default InputSelect