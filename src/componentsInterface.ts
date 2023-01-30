import React from "react";

export type Nodes = | React.ReactNode

export interface sizeBoxProps {
    name?: string;
    children?: React.ReactNode;
}

export interface textBlockInterface {
    name?: string;
    content?: string,
}