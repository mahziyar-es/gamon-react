import { useEffect, useRef, useState } from "react";
import { InputBasicProps } from "../../types/inputBasic.type";
import InputLayout from "./InputLayout";
import passwordVisibilityTogglerIcon from '../../assets/icon_eye.png'
import '../../style/inputBasic.css'


const InputBasic = <T extends number|string|undefined,>(props: InputBasicProps<T>) => {

    const inputEl = useRef<HTMLInputElement>(null)
    const [inputType, setInputType] = useState(props.type || 'text')
    const modelValueUpdateDelayInstance = useRef<any>(null)
    const modelValueUpdateDelayDuration = useRef<number>(0)


    useEffect(() => {
        determineValueUpdateDelayDuration()
    }, [])


    useEffect(() => {
        props.focus ? inputEl.current?.focus() : inputEl.current?.blur()
    }, [props.focus])


    const determineValueUpdateDelayDuration = ()=>{
        if(props.delay){
            if(props.delay === true){
                modelValueUpdateDelayDuration.current = 500
            } else {
                modelValueUpdateDelayDuration.current = props.delay
            }
        } else {
            modelValueUpdateDelayDuration.current =  0
        }
    }


    const passwordVisibilityTogglerHandler = ()=>{
        if (inputType == 'password')
            setInputType('text')
        else
            setInputType('password')
    }   



    const updateModelValue = (val: string|number) => {
        if(modelValueUpdateDelayDuration.current > 0){
            if (modelValueUpdateDelayInstance.current) {
                clearTimeout(modelValueUpdateDelayInstance.current);
                modelValueUpdateDelayInstance.current = null;
            }
            modelValueUpdateDelayInstance.current = setTimeout(() => {
                doUpdateModelValue(val)
            }, modelValueUpdateDelayDuration.current);
        } else {
            doUpdateModelValue(val)
        }
    }


    const doUpdateModelValue = (val: string | number) => {
        if (props.type == 'number') val = Number(val)
            
        if (props.onChange)
            props.onChange(val as T)
        else if (props.model?.[1])
            props.model[1](val as T)
    }




    return (
        <InputLayout title={props.title} icon={props.icon} className={props.className} style={props.style}>
            <input
                className={['gamon-input__input'].join(" ")}
                value={props.value || props.model?.[0] || ''}
                type={inputType}
                onInput={(e) => updateModelValue((e.target as HTMLInputElement).value)}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                autoFocus={props.autoFocus}

                ref={inputEl}
            />

            { props.passwordVisibilityToggler &&
                <img  onClick={passwordVisibilityTogglerHandler} className="gamon-input-basic__passowrd-visibility-toggler"  src={passwordVisibilityTogglerIcon} />
            }
        </InputLayout>
    )
}


export default InputBasic