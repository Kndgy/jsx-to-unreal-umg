import React, {DragEventHandler, useState} from "react";
import { SizeBox } from "../../components/sizeBox";
import styles from "./componentsBar.module.css"

interface SizeBoxLocalProps {
    children?: React.ReactNode
    title?: string
    canHaveChildren?: boolean
    onDrop?: DragEventHandler
}

interface TextBlockLocalProps {
    text?: string
    title?: string
}

export type ComponentProps = {
    index: number;
    children: React.ReactNode;
}

type ComponentsBarProps = {
    onDropCallback: () => void;
};

const SizeBoxLocal = ({title, children, canHaveChildren, onDrop}:SizeBoxLocalProps) => {
    if(canHaveChildren){
        return(
            <div className={styles.dragEl} draggable onDrop={onDrop} onDragOver={e => e.preventDefault()}>
                {title}
                {children}
            </div>
        )
    }
    return(
        <div className={styles.dragEl} draggable>
            {title}
            {children}
        </div>
    )
}

const TextBlockLocal = ({title, text}:TextBlockLocalProps) =>{
    return(
        <div className={styles.dragEl} draggable>
            {title}
            {text}
        </div>
    )
}

export const ComponentsBar = ({onDropCallback}: ComponentsBarProps) => {

    const onDrop = () => {
        onDropCallback()
        console.log("dropped")
    }

    return (
        <div className={styles.parent}>
            <div className={styles.componentList}>
                <SizeBoxLocal title="sizebox" onDrop={onDrop} />
                <TextBlockLocal title="textblock"/>
            </div>
            <div className={styles.widgetHiearchy}>
                <SizeBoxLocal title="sizebox" canHaveChildren={true}/>
            </div>
        </div>
    );
}