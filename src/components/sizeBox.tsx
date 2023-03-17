import React from "react"
import { sizeBoxProps } from "../interface/componentsInterface"
import { TextBlock } from "./textblock";

export const SizeBox = ({children}:sizeBoxProps) => {
    const validChildren = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && (child.type === TextBlock || child.type === SizeBox)
    );
    
    return <div>{validChildren}</div>;
}