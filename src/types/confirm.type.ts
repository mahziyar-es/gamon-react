import { ToggleAnimations } from "./general.type";
import { SheetProps } from "./sheet.type";

interface ConfirmProps {
    confirmButtonText ?: string,
    cancelButtonText ?: string,
    animation ?: ToggleAnimations,
    type ?: SheetProps['type'],
}



export {ConfirmProps}