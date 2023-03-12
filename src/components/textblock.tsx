import React from "react";
import { textBlockInterface } from "../interface/componentsInterface";

export const TextBlock = ({children}:textBlockInterface) => {
    return(
        <div>
            {children}
        </div>
    )
}