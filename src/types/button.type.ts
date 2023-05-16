import { ReactNode, ComponentType } from "react";
import { LoadingProps } from "./loading.type";
import Loading from "../components/Loading/Loading";

type ButtonProps = {
    text ?: string,
    type ?: 'submit' | 'reset' | 'button' | undefined,
    loading ?: boolean,
    loadingEffect?: 'default' | 'simple',
    loadingType?: LoadingProps['type'],
    loadingClassPrefix?: string,
    loadingCustomChild?: ReactNode,
    width ?: string|number,
    height ?: string|number,
    size ?: 'small' | 'medium' | 'large',
    widthParent ?: boolean,
    rounded?: boolean,
    disabled?: boolean,
    outline?: boolean,
    loadingCircleColor?: string,
    
    className ?: string,
    textClass?: string,
    
    style ?: { [index: string]: string },
    textStyle?: { [index: string]: string },

    loadingOuterCircleStyle?: { [index: string]: string },
    loadingInnerCircleStyle?: { [index: string]: string },

    children?: ReactNode,
    
    onClick ?: ()=>void,
}





export {
    ButtonProps,
}