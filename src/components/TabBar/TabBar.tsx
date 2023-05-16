import React, { useEffect, useRef, useState } from 'react'
import { prepareValueForStyleObject } from '../../utils'
import '../../style/tabBar.css'
import { TabBarProps } from '../../types/tabBar.type'
import Row from '../Grid/Row'
import Col from '../Grid/Col'



const TabBar = <T extends number|string,>(props: TabBarProps<T>) => {

    const ativeIndicator = useRef<HTMLDivElement>(null)
    const tabbar = useRef<HTMLDivElement>(null)
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>()
    const [tabbarPosition, setTabbarPosition] = useState(props.position || 'default')
    const [tabbarIndicatorType, setTabbarIndicatorType] = useState(props.indicatorType || 'box')
    const [indicatorStyleObject, setIndicatorStyleObject] = useState(props.indicatorStyle || {})
    const [tabStyleObject, setTabStyleObject] = useState(props.tabStyle || {})
    const [tabbarStyleObject, setTabbarStyleObject] = useState(props.style || {})
    const [activeTabStyleObject, setActiveTabStyleObject] = useState(props.activeTabStyle || {})



    useEffect(() => {


        if (props.indicatorColor) {
            setIndicatorStyleObject(prevState=>({...prevState, background : props.indicatorColor! }))
        }
        if (props.tabBarBgColor) {
            setTabbarStyleObject(prevState=>({...prevState, background : props.tabBarBgColor! }))
        }
        if (props.width) {
            setTabbarStyleObject(prevState=>({...prevState, maxWidth : prepareValueForStyleObject(props.width!)  }))
        }
        if (props.tabColor) {
            setTabStyleObject(prevState=>({...prevState, color : props.tabColor! }))
        }
        if (props.activeTabColor) {
            setActiveTabStyleObject(prevState=>({...prevState, color : props.activeTabColor! }))
        }

        setTimeout(() => {
            determineSelectedIndexBasedOnModelValue()
        },100)
    }, [])


    useEffect(() => {
        selectedTabChange()
    }, [selectedTabIndex])


    const determineSelectedIndexBasedOnModelValue = () => {
        const modelValue = props.model?.[0]
        if(!props.tabs) return

        if (Array.isArray(props.tabs[0])) {
            props.tabs?.forEach((tab, index) => {
                const tabValue = (tab as any[])?.[0]
                if(tabValue == modelValue) setSelectedTabIndex(index)
            })
        } 
        else {
            setSelectedTabIndex((modelValue as number) || 0)
        }
    }
    

    const tabSelection = (index: number) => {
        setSelectedTabIndex(index)
    }


    const selectedTabChange = () => {

        if(tabbarIndicatorType != 'none')
            moveActiveIndicator(selectedTabIndex!)

        const tab = props.tabs![selectedTabIndex!]

        let output
        if (Array.isArray(tab)) output = tab[0]
        else output = selectedTabIndex
            
        props.model?.[1](output as T)
    }


    const moveActiveIndicator = async (index :number) => {

        const tabbarRect = await tabbar.current!.getBoundingClientRect() 
        const selectedTabRect = await getSelectedTabRect(index)
        if(!selectedTabRect) return

        ativeIndicator.current!.style.width = selectedTabRect.width + 16 + 'px'
        ativeIndicator.current!.style.left = selectedTabRect.left - tabbarRect.left - 8 + 'px'
        
        if(tabbarIndicatorType == 'box')
            ativeIndicator.current!.style.height = selectedTabRect.height + 16 + 'px'
    }


    const getSelectedTabRect = async (index: number) => {
        let target = tabbar.current?.children[index]
        return (target as HTMLDivElement)?.getBoundingClientRect()
    }


    const getActiveTabStyleObject = (index: number)=>{
        if (index == selectedTabIndex) return activeTabStyleObject;
    }


    

    
    return (
        <Row
            className={["gamon-tabbar__container", "gamon-tabbar__container--position-" + tabbarPosition].join(" ")}
        >
            <Col
                width={props.responsiveWidth || 'lg-12'}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                
                <div className={["gamon-tabbar gamon-custom-scroll", props.className].join(" ")} style={tabbarStyleObject} ref={tabbar}>

                    { props.tabs &&
                        props.tabs.map((tab, index) => (
                            <div
                                onClick={(e) => tabSelection(index)}
                                className={[
                                    "gamon-tabbar__tab",
                                    props.tabClass,
                                    index == selectedTabIndex ? props.activeTabClass : '' ,
                                    selectedTabIndex == index ? 'gamon-tabbar__tab--active' : '',
                                ].join(" ")}
                                style={{ ...tabStyleObject, ...getActiveTabStyleObject(index)}}
                                key={index}
                            >
                                { Array.isArray(tab) ? 
                                    tab[1]
                                    :
                                    tab
                                }
                            </div>
                        ))
                    }

                    { tabbarIndicatorType != 'none' &&
                        <div
                            className={[
                                "gamon-tabbar__active__indicator",
                                "gamon-tabbar__active__indicator--type-" + tabbarIndicatorType,
                                props.indicatorClass,
                            ].join(" ")}
                            style={indicatorStyleObject}
                            ref={ativeIndicator}
                        >
                        </div>
                    }
            
                </div>

            </Col>
        </Row>
    )
}

export default TabBar