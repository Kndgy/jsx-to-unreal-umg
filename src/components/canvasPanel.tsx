import React from "react";
import { canvasPanelInterface } from "../interface/componentsInterface"
import { SizeBox } from "./sizeBox";
import { TextBlock } from "./textblock";


//to do multiple children without fragment when used
export const CanvasPanel = ({children}: canvasPanelInterface) => {
    const validChildren = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && (child.type === SizeBox || child.type === TextBlock)
    );
    
    return <div>{validChildren}</div>;
}