import React from "react";

interface textBlockInterface {
    name?: string;
    content?: string,
}

export const TextBlock = ({content}:textBlockInterface) => {
    return(
        <div>
            {content}
        </div>
    )
}