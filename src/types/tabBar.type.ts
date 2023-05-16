import { ReactNode } from "react";

interface TabBarProps<T>{
    model?: [T, (value: T) => void],
    
    tabs ?: string[] | ReactNode[] | (string|ReactNode)[] | (string|ReactNode|number)[][],
    position ?: 'default' | 'fixed-bottom' | 'fixed-top',
    indicatorType?: 'none' | 'box' | 'line-top' | 'line-bottom',
    width?: number | string,
    responsiveWidth ?: string,
    
    tabStyle ?: {[index:string]: string},
    indicatorStyle?: {[index:string]: string},
    activeTabStyle?: {[index:string]: string},
    
    tabClass ?: string,
    indicatorClass?: string,
    activeTabClass?: string,
    
    indicatorColor ?: string,
    tabBarBgColor ?: string,
    tabColor ?: string,
    activeTabColor?: string,

    style ?: {[index:string]: string},
    className ?: string,

}


export {
    TabBarProps,
}