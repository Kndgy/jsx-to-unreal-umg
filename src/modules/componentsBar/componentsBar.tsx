import React, {useState} from "react";
import styles from "./componentsBar.module.css"

const sizeBox = (children:React.ReactNode) => {
    return(
        <>
            {children}
        </>
    )
}

export type ComponentProps = {
    index: number;
    children: React.ReactNode;
}

type ComponentsBarProps = {
    onDropCallback: (componentData: ComponentProps) => void;
};

const ComponentList: ComponentProps[] = [
    {
        index: 0, 
        children:<div className={styles.dragEl}>sizeBox</div>
    },
    {
        index: 1, 
        children:<div className={styles.dragEl}>TextBlock</div>
    },
    {
        index: 2, 
        children:<div className={styles.dragEl}>text test</div>
    } 
]

export const ComponentsBar = ({onDropCallback}: ComponentsBarProps) => {
    const [draggedIndex, setDraggedIndex] = useState(-1);
    const [Droped, setDroppedIndex ] = useState(-1)
  
    const onDragStart = (index:number) => (e: React.DragEvent<HTMLDivElement>) => {
        console.log(index)
        setDraggedIndex(index);
    };
  
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("hello")
        onDropCallback(ComponentList[draggedIndex])
        setDroppedIndex(draggedIndex)
    };

    const Top = () => {
        return (
            <div className={styles.Top}>
                {ComponentList.map((component, index) => (
                    <div key={index} draggable="true" onDragStart={onDragStart(index)}>
                        {component.children}
                    </div>
                ))}
            </div>
        );
    };
  
    const Bottom = () => {
        if (Droped === -1) {
            return (
                <div onDrop={onDrop} onDragOver={e => e.preventDefault()}>
                    drop here    
                </div>
            )
        }
        return (
            <div onDrop={onDrop} onDragOver={e => e.preventDefault()}>
                drop here    
                <br/>
                indexes
                <br/>
                {Droped}
                <br/>
                components
                <br/>
                {ComponentList[Droped].children}
            </div>
        );
    }

    return (
        <div className={styles.parent}>
            <Top />
            <Bottom />
        </div>
    );
}