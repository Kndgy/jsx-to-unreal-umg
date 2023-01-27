import React from "react"

interface sizeBoxProps {
    name?: string;
    children?: React.ReactNode;
}

export const sizeBox = ({name, children}:sizeBoxProps) => {
    return(
        <div className="sizeBox">
            {children}
        </div>
    )
}