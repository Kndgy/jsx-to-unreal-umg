import React from "react";
import { textBlockInterface } from "../interface/componentsInterface";

export const TextBlock = ({content}:textBlockInterface) => {
    return(
        <div>
            {content}
        </div>
    )
}