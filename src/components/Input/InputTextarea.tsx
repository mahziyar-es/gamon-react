import { useEffect, useRef, useState } from "react"
import { InputTextareaProps } from "../../types/inputTextarea.type"
import InputLayout from "./InputLayout"
import '../../style/inputTextarea.css'


const InputTextarea = <T extends string|number|undefined,>(props: InputTextareaProps<T>) => {
    
    const inputEl = useRef<HTMLTextAreaElement>(null)

    const updateModelValue = (value : string) => {
        props.onChange?.(value as T)
        props.model?.[1]?.(value as T)
    }

    useEffect(() => {
        props.focus ? inputEl.current?.focus() : inputEl.current?.blur()
    }, [props.focus])



    return (
        <InputLayout title={props.title} icon={props.icon} className={props.className} style={props.style}>
            <textarea
                className="gamon-input__input gamon-input-textarea"
                cols={props.cols || 10}
                rows={props.rows || 5}
                value={props.value || props.model?.[0] || ''}
                onInput={(e) => updateModelValue((e.target as HTMLInputElement).value)}
                placeholder={props.placeholder}
                required={props.required}
                readOnly={props.readOnly}
                autoFocus={props.autoFocus}

                ref={inputEl}
            >
            </textarea>
        </InputLayout>
    )
}

export default InputTextarea