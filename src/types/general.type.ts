import { NotifyTextBoxProps } from "./notify.type";
import { SheetProps } from "./sheet.type";

type StyleObject = { [index: string]: string }

type ToggleAnimations =  'slide-up'| 'slide-down'| 'slide-left'| 'slide-right'| 'fade'| 'scale'|'rotate'

type Confirm = (
    title: string,
    text: string,
    confirmCallback: () => void,
    cancelCallback?: () => void,
    animation?: ToggleAnimations,
    type?: SheetProps['type'],
    confirmButtonText ?: string,
    cancelButtonText?: string,
) => void;



type Notify = (
    text: string,
    type?: NotifyTextBoxProps['type'],
    duration?: number,
    animation?: ToggleAnimations,
) => void;








export {
    ToggleAnimations,
    Confirm,
    Notify,
    StyleObject,
}