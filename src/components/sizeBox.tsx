import React from "react"
import { sizeBoxProps } from "../interface/componentsInterface"


export const SizeBox = ({name, children}:sizeBoxProps) => {
    return(
        <div className="sizeBox">
            {children}
        </div>
    )
}