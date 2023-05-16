import React , { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import '../../style/picker.css'
import { PickerProps } from "../../types/picker.type"
import iconChevronUp from '../../assets/icon_chevron_up.png'
import iconChevronDown from '../../assets/icon_chevron_down.png'
import iconChevronRight from '../../assets/icon_chevron_right.png'
import iconChevronLeft from '../../assets/icon_chevron_left.png'



const Picker = (props: PickerProps) => {

    const pickerOptionsEl = useRef<HTMLDivElement>(null)
    const pickerSelectedFrameEl = useRef<HTMLDivElement>(null)
    const pickerEl = useRef<HTMLDivElement>(null)
    const optionsElsArray = useRef<HTMLCollection>()
    const tempTranslateValue = useRef<number>(0) // this one is defined as a ref so we can keep its value between renders and prevent it's batching. because we want to use its changed value right away
    const finalTranslateValue = useRef<number>(0)
    const mouseMoveLastPosition = useRef<number>(0)
    const optionsCount = useRef<number>(0)
    const selectedOptionIndex = useRef<number>(0)
    const eachOptionSize = useRef<number>(0)
    const mouseIsDown = useRef<boolean>(false)
    const [pickerHeight, setPickerHeight] = useState(props.height || 300)
    const [pickerWidth, setPickerWidth] = useState(props.width || 450)
    const [mouseMoveStepRatio, setMouseMoveStepRatio] = useState(props.mouseMoveRatio || 0.1)
    const [touchMoveStepRatio, setTouchMoveStepRatio] = useState(props.touchMoveRatio || 0.2)
    const [pickerStyleObject, setPickerStyleObject] = useState<{[index:string]: string}>()
    const [selectedFrameStyleObject, setSelectedFrameStyleObject] = useState<{[index:string]: string}>()
    const [pickerOptionsContainerStyleObject, setPickerOptionsContainerStyleObject] = useState<{[index:string]: string}>()



    useEffect(()=>{
        init()
        addEventListeners()

        return ()=> removeEventListeners()
    }, [])
        

    const addEventListeners = () => {
        pickerEl.current?.addEventListener('wheel', mouseWheelHandler, { passive: false })
        
        pickerEl.current?.addEventListener('mousedown', mouseDownHandler)
        pickerEl.current?.addEventListener('mouseup', mouseUpHandler)
        pickerEl.current?.addEventListener('mouseleave', mouseLeaveHandler)
        pickerEl.current?.addEventListener('mousemove', mouseMoveHandler)
        
        pickerEl.current?.addEventListener('touchstart', mouseDownHandler, {passive:false})
        pickerEl.current?.addEventListener('touchend', mouseUpHandler, {passive:false})
        pickerEl.current?.addEventListener('touchmove', mouseMoveHandler, {passive:false})
    }
    
    const removeEventListeners = () => {
        pickerEl.current?.removeEventListener('wheel', mouseWheelHandler, { passive: false })

        pickerEl.current?.removeEventListener('mousedown', mouseDownHandler)
        pickerEl.current?.removeEventListener('mouseup', mouseUpHandler)
        pickerEl.current?.removeEventListener('mouseleave', mouseLeaveHandler)
        pickerEl.current?.removeEventListener('mousemove', mouseMoveHandler)

        pickerEl.current?.removeEventListener('touchstart', mouseDownHandler, { passive: false })
        pickerEl.current?.removeEventListener('touchmove', mouseMoveHandler, { passive: false })
        pickerEl.current?.removeEventListener('touchend', mouseUpHandler, { passive: false })
    }


    const init = async () =>{

        optionsElsArray.current = pickerOptionsEl.current!.children
        
        if(optionsElsArray.current.length != optionsCount.current){

            optionsCount.current = optionsElsArray.current.length

            Array.from(optionsElsArray.current).forEach((child, index)=>{
                child.classList.add('gamon-picker__options-container__option')
            })

            const optionsSize = await determineOptionsSize()
            eachOptionSize.current = optionsSize
            applyPickerAndSelectedFrameSizes()
            applyEachOptionSize()
            const startingIndex = await processModelValueAnddetermineStartingOptionIndex()
            moveSelectionFrameToSelectedIndex(startingIndex)
        }
    }


    const determineOptionsSize = async () => {
        let finalSize = 30 // as the last resort, if we can not find a valid size for each element, we set a default size

        if (props.optionSize) {
            finalSize = props.optionSize
        }
        else {
            let optionsSizes: number[] = []
            
            Array.from(optionsElsArray.current!).forEach((child, index) => {
                optionsSizes.push(  calcOptionsSizeBasedOnStyle(child)  )
            })

            const optionsMaxSize = Math.max(...optionsSizes)

            if (optionsMaxSize != 0)
                finalSize = optionsMaxSize
        }

        return finalSize
    }


    const calcOptionsSizeBasedOnStyle = (optionEl:Element) : number=>{
        var optionStyle = getComputedStyle(optionEl)

        let sizeStyleKeys = []

        if(props.horizontal){
            sizeStyleKeys = ['border-left','border-right','padding-left','padding-right','margin-left','margin-right','width']
        } else {
            sizeStyleKeys = ['border-top','border-bottom','padding-top','padding-bottom','margin-top','margin-bottom','height']
        }


        let optionSize = 0
        sizeStyleKeys.forEach((key:string)=>{
            optionSize += parseFloat(optionStyle.getPropertyValue(key))
        })

        return optionSize
    }


    const applyPickerAndSelectedFrameSizes = (): void => {
        setPickerStyleObject(prevState => {
            return { ...prevState, height: pickerHeight + 'px', width: pickerWidth + 'px',  ...props.style}
        })
    
        if (props.horizontal) {
            setSelectedFrameStyleObject(prevState => {return {...prevState, width: eachOptionSize.current+'px'} } )
            setPickerOptionsContainerStyleObject(prevState => {return {...prevState, width: eachOptionSize.current+'px'} } )
        }
        else {
            setSelectedFrameStyleObject(prevState => {return {...prevState, height: eachOptionSize.current+'px'} } )
            setPickerOptionsContainerStyleObject(prevState => {return {...prevState, height: eachOptionSize.current+'px'} } )
        }

        setSelectedFrameStyleObject(prevState => {return {...prevState, ...props.selectedFrameStyle} } )
    }


    const applyEachOptionSize = (): void => {
        
        let styleToSet : keyof CSSProperties = 'height'
        if (props.horizontal)
            styleToSet = 'width'
        
        Array.from(optionsElsArray.current!).forEach((child, index) => {
            (child as HTMLElement).style[styleToSet] = eachOptionSize.current+'px'
        })
    }


    const processModelValueAnddetermineStartingOptionIndex = async () => {
        let startingIndex = 0; // default starting index is the first item (aka 0)

        const modelValue = props.value || props.model?.[0]

        if (modelValue) {
            if (props.getValue) {
                Array.from(optionsElsArray.current!).forEach((optionEl, index) => {
                    let value = optionEl.getAttribute('data-value')
                    if (value == modelValue)
                        startingIndex = index
                })
            }
            else startingIndex = modelValue
        }
        else if(props.startCenter)
            startingIndex = optionsCount.current % 2 == 0 ? Math.floor(optionsCount.current / 2) - 1 : Math.floor(optionsCount.current / 2)
        
        return startingIndex
    }


    const moveSelectionFrameToSelectedIndex = (nextOptionsIndexToBeSelected:number) : void =>{

        pickerOptionsEl.current!.children[selectedOptionIndex.current].classList.remove('gamon-picker__options-container__option--selected')

        // finalize option selection and moving the options
        selectedOptionIndex.current = nextOptionsIndexToBeSelected

        pickerOptionsEl.current!.children[selectedOptionIndex.current].classList.add('gamon-picker__options-container__option--selected')

        correctOptionsPosition()
        updateModelValue()
    }


    const correctOptionsPosition = () : void =>{
        tempTranslateValue.current = 0
        finalTranslateValue.current = -1 * selectedOptionIndex.current * eachOptionSize.current
        setPickerOptionsContainerStyleObject(prevState=>{return {...prevState, transform: transform() } })
    }


    const transform = () : string =>{
        if(props.horizontal)
            return 'translateX('+(finalTranslateValue.current)+'px)'
        else
            return 'translateY('+(finalTranslateValue.current)+'px)'
    }


    const updateModelValue = ()=>{
        let valueToReturn : any = ''

        if (props.getValue) {
            valueToReturn = pickerOptionsEl.current!.children[selectedOptionIndex.current].getAttribute('data-value')
            if (!valueToReturn)
                valueToReturn = pickerOptionsEl.current!.children[selectedOptionIndex.current].innerHTML
        }
        else 
            valueToReturn = selectedOptionIndex.current
        
        props.onChange?.(valueToReturn)
        props.model?.[1]?.(valueToReturn)
    }



    // ========================================================================================================
    // ========================================================================================================
    // ========================================================================================================
    
    const getMovementDirection = (e:Event) => {

        let direction = 0
        const horizontal = props.horizontal
        
        if (e.type == 'mousemove' && e instanceof MouseEvent) {
            let mouseCurrentPosition = horizontal ? e.clientX : e.clientY
            direction = mouseCurrentPosition - mouseMoveLastPosition.current
            mouseMoveLastPosition.current = mouseCurrentPosition
        }
        else if(e.type == 'touchmove' && e instanceof TouchEvent){
            let mouseCurrentPosition = horizontal ? e.changedTouches[0].clientX : e.changedTouches[0].clientY
            direction = mouseCurrentPosition - mouseMoveLastPosition.current
            mouseMoveLastPosition.current = mouseCurrentPosition
        }
        else if(e.type == 'wheel' && e instanceof WheelEvent){
            direction = -1*(e as WheelEvent).deltaY
        }
    
        return direction
    }
    

    const calculateNextOptionIndexToBeSelectedBasedOnMovementDirection = (movementDirection:number) : number =>{

        // determining next option index to be selected
        let nextOptionsIndexToBeSelected : number = selectedOptionIndex.current


        if(movementDirection > 0)
            nextOptionsIndexToBeSelected -= 1
        else
            nextOptionsIndexToBeSelected += 1


        // check for end of list (both ends)
        if(nextOptionsIndexToBeSelected > optionsCount.current - 1){
            if(props.stopAtEnd)
                nextOptionsIndexToBeSelected = selectedOptionIndex.current // revert to old value
            else
                nextOptionsIndexToBeSelected = 0
        }
        else if(nextOptionsIndexToBeSelected < 0){
            if(props.stopAtEnd)
                nextOptionsIndexToBeSelected = selectedOptionIndex.current // revert to old value
            else
                nextOptionsIndexToBeSelected = optionsCount.current - 1
        }

        return nextOptionsIndexToBeSelected
    }
    

    // ===============================================================================================================
    // =================================================   mouse wheel handler =======================================
    // ===============================================================================================================

    const mouseWheelHandler = (e:Event)=>{
        e.preventDefault();
        const mouseEventDirection = getMovementDirection(e)
        let nextOptionsIndexToBeSelected: number = calculateNextOptionIndexToBeSelectedBasedOnMovementDirection(mouseEventDirection)
        moveSelectionFrameToSelectedIndex(nextOptionsIndexToBeSelected)
    }


    
    // ===============================================================================================================
    // =================================================   arrows handler      =======================================
    // ===============================================================================================================

    const pick = (direction : number)=>{
        let nextOptionsIndexToBeSelected : number  = calculateNextOptionIndexToBeSelectedBasedOnMovementDirection(direction)
        moveSelectionFrameToSelectedIndex(nextOptionsIndexToBeSelected)
    }


    // ===============================================================================================================
    // =================================================   mouse drag handler ========================================
    // ===============================================================================================================
   

    const mouseDownHandler = (e:Event) => {
        mouseIsDown.current = true
    }

    const mouseUpHandler = (e:Event) =>{
        mouseIsDown.current = false
        correctOptionsPosition()
    }

    const mouseLeaveHandler = (e:Event) =>{
        mouseIsDown.current = false
        correctOptionsPosition()
    }

    const mouseMoveHandler = (e: Event) => {
        e.preventDefault()
        if(!mouseIsDown.current)
            return
        

        let movementDirection: number = getMovementDirection(e)

        // return if the movement is 0 (mouse did move but not in the direction that we want it, like we would like to to move in Y direction, but it moved in X)
        if(movementDirection == 0)
            return;

        movementDirection = movementDirection > 0 ? 1 : -1


        const translateValue = movementDirection * (0.1 * eachOptionSize.current)
        tempTranslateValue.current += translateValue
        finalTranslateValue.current += translateValue

        setPickerOptionsContainerStyleObject(prevState=>{return { ...prevState, transform: transform() } })
       
        if (Math.abs(tempTranslateValue.current) >= 0.6 * eachOptionSize.current) {
            let nextOptionsIndexToBeSelected : number  = calculateNextOptionIndexToBeSelectedBasedOnMovementDirection(movementDirection)
            moveSelectionFrameToSelectedIndex(nextOptionsIndexToBeSelected)
        }
    }

    

    return (
        <div className={['gamon-picker', 'gamon-picker--'+ (props.horizontal ? 'horizontal' : 'vertical') , props.className ].join(" ")} ref={pickerEl} style={pickerStyleObject}>

            {props.arrow && !props.horizontal &&
                <>
                    <img onClick={()=>pick(1)} className="gamon-picker__arrow gamon-picker__arrow-up"  src={iconChevronUp} />
                    <img onClick={()=>pick(-1)} className="gamon-picker__arrow gamon-picker__arrow-down"  src = {iconChevronDown}  />
                </>
            }
            {props.arrow && props.horizontal &&
                <>
                    <img onClick={()=>pick(-1)} className="gamon-picker__arrow gamon-picker__arrow-right"  src={iconChevronRight} />
                    <img onClick={()=>pick(1)} className="gamon-picker__arrow gamon-picker__arrow-left"  src={iconChevronLeft} />
                </>
            }

            <div className="gamon-picker__options-container" ref={pickerOptionsEl} style={pickerOptionsContainerStyleObject}>
                {props.children}

                {props.options?.map((op, index) => (
                    <div className={['gamon-picker__options-container__option', props.optionClass].join(" ")}  data-value={typeof(op) == 'object' ? op[1] : op }  key={'props-option-'+index} style={props.optionStyle}>
                        <span>{ typeof(op) == 'object' ? op[0] : op }</span>
                    </div>
                ))}
                
            </div>
        
            { !props.noSelectedFrame &&
                <div className={['gamon-picker__selected-frame', props.selectedFrameClass].join(" ")} ref={pickerSelectedFrameEl} style={selectedFrameStyleObject}></div>
            }
            
        </div>
    )

}



export default Picker