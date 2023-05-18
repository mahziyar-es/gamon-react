import React, { useEffect, useRef, useState } from "react"
import { CarouselProps } from "../../types/carousel.type"
import '../../style/carousel.css'
import carouselNavLeft from '../../assets/icon_carousel_left.png'
import carouselNavRight from '../../assets/icon_carousel_right.png'



const Carousel = (props: CarouselProps) => {
    
    const carouselItemsContainerEl = useRef<HTMLDivElement>(null)
    const containerEl = useRef<HTMLDivElement>(null)
    const itemsCount = useRef<number>(0)
    const itemsCountToShowPerSlide = useRef<number>(props.itemsPerView || 1)
    const itemsCountToMovePerSlide = useRef<number>(props.itemsPerSlide || 1)
    const itemsMargin = useRef<number>(props.eachItemMargin || 0)
    const autoIntervalValue = useRef<any>(null)
    const autoIntervalDuration = useRef<number>(props.duration || 4000)
    const mouseMoveDetectionDelay = useRef<any>(null)
    const mouseDown = useRef<boolean>(false)
    const startX = useRef<number>(0)
    const translation = useRef<number>(0)
    const indexOfVisibleItem = useRef<number>(props.model?.[0] || 0)
    
    const [indexOfVisibleItemReactive, setIndexOfVisibleItemReactive] = useState<number>(0)
    const [indicatorsCount, setIndicatorsCount] = useState<number>(0)


    useEffect(()=>{
        let childs = carouselItemsContainerEl.current!.children
        itemsCount.current = childs.length


        if(props.responsive)
            responsiveInit()
        else if(itemsCount.current > 0)
                carouselInit()

        if(props.auto)
            startAutoNavigate()

        addEventListeners()
        
        return () => {
            stopAutoNavigate()
            stopScreenSizeChangeListener()
            removeEventListeners()
        }
        
    }, [])


    useEffect(() => {
        if (indexOfVisibleItemReactive != props.model?.[0]) props.model?.[1](indexOfVisibleItemReactive)
    },[indexOfVisibleItemReactive])


    const addEventListeners = () => {
        containerEl.current?.addEventListener('mousedown', startDragging)
        containerEl.current?.addEventListener('mouseup', stopDragging)
        containerEl.current?.addEventListener('mouseleave', stopDragging)
        containerEl.current?.addEventListener('mousemove', mouseMoveHandler)

        containerEl.current?.addEventListener('touchstart', startDragging, {passive:false})
        containerEl.current?.addEventListener('touchmove', mouseMoveHandler, {passive:false})
        containerEl.current?.addEventListener('touchend', stopDragging, {passive:false})
    }

    const removeEventListeners = () => {
        containerEl.current?.removeEventListener('mousedown', startDragging)
        containerEl.current?.removeEventListener('mouseup', stopDragging)
        containerEl.current?.removeEventListener('mouseleave', stopDragging)
        containerEl.current?.removeEventListener('mousemove', mouseMoveHandler)

        containerEl.current?.removeEventListener('touchstart', startDragging, {passive:false})
        containerEl.current?.removeEventListener('touchmove', mouseMoveHandler, {passive:false})
        containerEl.current?.removeEventListener('touchend', stopDragging, {passive:false})
    }



    useEffect(() => {
        let childs = carouselItemsContainerEl.current!.children
        if(childs.length != itemsCount.current)
            carouselInit()
    }, [props.children])



    const carouselInit = ()=>{
        
        let childs = carouselItemsContainerEl.current!.children as HTMLCollectionOf<HTMLElement>
        itemsCount.current = Math.ceil((childs.length - itemsCountToShowPerSlide.current) / itemsCountToMovePerSlide.current) + 1
        setIndicatorsCount(itemsCount.current)

        let itemsContainerWidth = carouselItemsContainerEl.current!.getClientRects()[0].width
        carouselItemsContainerEl.current!.style.width = itemsContainerWidth+'px'

        let eachItemWidth = (itemsContainerWidth/itemsCountToShowPerSlide.current) - 2*itemsMargin.current

        Array.from(childs!).forEach((child, index) => {
            child.classList.add('gamon-carousel__item')

            child.style.width = eachItemWidth+'px'
            child.style.minWidth = eachItemWidth+'px'
            child.style.marginLeft = itemsMargin.current+'px'
            child.style.marginRight = itemsMargin.current+'px'

            if(props.eachItemHeight)
                child.style.height = props.eachItemHeight+'px'
        })

        navigate(indexOfVisibleItem.current)
    }


    const startAutoNavigate = ()=>{
        autoIntervalValue.current = setInterval(() => {
            navigate()
        }, autoIntervalDuration.current)
    }


    const stopAutoNavigate = ()=>{
        clearInterval(autoIntervalValue.current)
    }
   

    const responsiveInit = ()=>{
        startScreenSizeChangeListener()
        handleScreenResize()
    }

    const startScreenSizeChangeListener = ()=>{
        window.addEventListener('resize', handleScreenResize)
    }

    const stopScreenSizeChangeListener = ()=>{
        window.removeEventListener('resize', handleScreenResize)
    }


    const handleScreenResize = (e?:Event)=>{
        let carouselParentWidth =   containerEl.current!.clientWidth
        let sizes = Object.keys(props.responsive!).map(Number);


        let sizesLessThanParentWidth = sizes.filter((value)=> value < carouselParentWidth)
        
        let sizesAndParentWidthDiff : number[] = []
        sizesLessThanParentWidth.map((size, index)=>{
            sizesAndParentWidthDiff.push(carouselParentWidth - size)
        })

        let newItemsToShowPerSlide = props.responsive![sizesLessThanParentWidth[sizesAndParentWidthDiff.indexOf(Math.min(...sizesAndParentWidthDiff))]]

        if(newItemsToShowPerSlide != itemsCountToShowPerSlide.current){
            itemsCountToShowPerSlide.current = newItemsToShowPerSlide
            carouselInit()
        }
    }




    // =============================================== navigate by drag

    const getMouseMovementDirection = (e:Event) => {

        let direction = 0

        if (e.type == 'mousemove') {
            let mouseCurrentPosition = (e as MouseEvent).clientX
            direction = mouseCurrentPosition - startX.current
            startX.current = mouseCurrentPosition
        }
        else if(e.type == 'touchmove' && e instanceof TouchEvent){
            let mouseCurrentPosition = (e as TouchEvent).changedTouches[0].clientX
            direction = mouseCurrentPosition - startX.current
            startX.current = mouseCurrentPosition
        }
    
        return direction
    }


    const mouseMoveHandler = (e:Event)=>{
        e.preventDefault();
        if(!mouseDown.current) { return; }
        // const x = e.pageX - containerEl.current!.offsetLeft;
        // const scroll = x - startX.current!;

        const direction = getMouseMovementDirection(e)


        if (mouseMoveDetectionDelay.current) {
            clearTimeout(mouseMoveDetectionDelay.current)
            mouseMoveDetectionDelay.current = null
        }

        mouseMoveDetectionDelay.current = setTimeout(()=>{
            if(direction < 0)
                navigate('left')
            else 
                navigate('right')
        },200)
    }

    const startDragging = () => mouseDown.current = true;
    
    const stopDragging = ()=> mouseDown.current = false;
    




    // =============================================== navigate

    const navigate = (navDirection : string|number = 'left', isAutoNavigate : boolean = false)=>{

        if(props.auto && !isAutoNavigate){
            stopAutoNavigate()
            startAutoNavigate()
        }

        if(typeof(navDirection) == 'number') {
            // setIndexOfVisibleItem(navDirection)
            indexOfVisibleItem.current = navDirection
            translation.current =  (-1*navDirection*itemsCountToMovePerSlide.current)*100/itemsCountToShowPerSlide.current
        }
        else {
            let translationFactor = -1;

            if (navDirection == 'left') {
                if((itemsCount.current-1) == indexOfVisibleItem.current){

                    if(props.stopAtEnd)
                        return

                    // setIndexOfVisibleItem(0)
                    indexOfVisibleItem.current = 0
                    translationFactor = itemsCount.current - 1
                }
                else{ 
                    // setIndexOfVisibleItem(prevState => prevState + 1 )
                    indexOfVisibleItem.current +=1 
                    translationFactor = -1
                }
            }
            else if(navDirection == 'right'){
                if(indexOfVisibleItem.current == 0){
                    
                    if(props.stopAtEnd)
                        return

                    // setIndexOfVisibleItem(itemsCount.current - 1)
                    indexOfVisibleItem.current = itemsCount.current - 1
                    translationFactor = -1*(itemsCount.current - 1)
                }
                else{
                    // setIndexOfVisibleItem(prevState => prevState-1)
                    indexOfVisibleItem.current -= 1
                    translationFactor = 1
                }

            }

            translation.current +=  (translationFactor*itemsCountToMovePerSlide.current)*100/itemsCountToShowPerSlide.current
        }

        carouselItemsContainerEl.current!.style.transform = 'translateX(' + translation.current + '%)'
        
        setIndexOfVisibleItemReactive(indexOfVisibleItem.current)
    }




    return (
        <div className={['gamon-carousel', props.className].join(' ')} style={props.style} ref={containerEl}  >

            <div onClick={()=>navigate('left')} className="gamon-carousel__nav-next">
                <img src={carouselNavLeft} />
            </div>
            <div onClick={()=>navigate('right')} className="gamon-carousel__nav-prev">
                <img src={carouselNavRight} />
            </div>


            <div className="gamon-carousel__items-container" ref={carouselItemsContainerEl} >
                {props.children}
            </div>

            

            { !props.noIndicator &&(
                <div className="gamon-carousel__indicators-container">
                    {
                        Array(indicatorsCount).fill(1).map((i, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(index)}
                                className={['gamon-carousel__indicators-container__indicator', indexOfVisibleItemReactive == index ? 'gamon-carousel__indicators-container__indicator--active' : ''].join(" ")}
                            ></div>
                        ))
                    }
                </div>
            )}
            
        </div>
    )

}


export default Carousel