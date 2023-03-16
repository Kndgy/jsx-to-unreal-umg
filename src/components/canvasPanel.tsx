import { canvasPanelInterface } from "../interface/componentsInterface"


//to do multiple children without fragment when used
export const CanvasPanel = ({children}: canvasPanelInterface) => {
    return(
        <>
            {children}
        </>
    )
}