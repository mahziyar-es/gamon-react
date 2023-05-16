import { ToggleAnimations } from "./types/general.type";
import { NotifyTextBoxProps } from "./types/notify.type";
import { SheetProps } from "./types/sheet.type";

type SheetTypes = SheetProps['type']

// =======================================================================================================
const notify = (
    text: string | string[],
    type: NotifyTextBoxProps['type'] = '',
    duration ?: number,
    animation ?: ToggleAnimations
) => {
    const notifyEvent = new CustomEvent('gamonNotifyEvent', {
        detail: {
          text: text,
          type: type,
          duration: duration,
          animation: animation,
        }
    });
    window.dispatchEvent(notifyEvent)
}


// =======================================================================================================
const confirm = (
    title: string,
    text: string,
    confirmCallback: () => void,
    cancelCallback?: () => void,
    animation?: ToggleAnimations,
    type?: SheetTypes,
    confirmButtonText?: string,
    cancelButtonText?: string
) => {
    const confirmEvent = new CustomEvent('gamonConfirmEvent', {
        detail: {
            title: title,
            text: text,
            confirmCallback: confirmCallback,
            cancelCallback: cancelCallback,
            animation: animation,
            type: type,
            confirmButtonText : confirmButtonText,
            cancelButtonText: cancelButtonText,
        }
    });
    window.dispatchEvent(confirmEvent)
}



// =======================================================================================================
const Gamon = {
    notify,
    confirm,
}


export default Gamon