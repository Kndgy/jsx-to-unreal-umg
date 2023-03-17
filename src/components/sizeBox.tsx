import React from "react"
import { sizeBoxProps } from "../interface/componentsInterface"
import { TextBlock } from "./textblock";

export const SizeBox = ({children}:sizeBoxProps) => {
    const validChild = React.Children.only(children);

    if (!React.isValidElement(validChild) || (validChild.type !== TextBlock && validChild.type !== SizeBox)) {
        console.warn('SizeBox only accepts a single child of type TextBlock or SizeBox');
    }


    return <div>{validChild}</div>;
}