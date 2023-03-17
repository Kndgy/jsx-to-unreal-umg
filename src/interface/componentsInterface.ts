import React, { ReactNode } from "react";

export type Nodes = | React.ReactNode

export interface sizeBoxProps {
    name?: string;
    children?: React.ReactNode
}

export interface textBlockInterface {
    name?: string;
    children?: string;
}

export interface canvasPanelInterface {
    name?: string;
    children?: ReactNode[] | ReactNode
}