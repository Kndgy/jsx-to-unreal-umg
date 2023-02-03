import React from "react";
import { textBlockInterface } from "./componentsInterface";

export const TextBlock = ({content}:textBlockInterface) => {
    return(
        <div>
            {content}
        </div>
    )
}