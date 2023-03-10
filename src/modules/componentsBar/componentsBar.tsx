import React, {useState} from "react";
import styles from "./componentsBar.module.css"

const sizeBox = (children:React.ReactNode) => {
    return(
        <>
            {children}
        </>
    )
}

type ComponentProps = {
    index: number;
    children: React.ReactNode;
}

const ComponentList: ComponentProps[] = [
    {
        index: 0, 
        children:<>sizeBox</>
    },
    {
        index: 1, 
        children:<>TextBlock</>
    },
    {
        index: 2, 
        children:<>text test</>
    } 
]

export const ComponentsBar = () => {
    const [componentList, setComponentList] = useState(ComponentList);
    const [draggedIndex, setDraggedIndex] = useState(-1);
  
    const onDragStart = (index:number) => (e: React.DragEvent<HTMLDivElement>) => {
      console.log(index)
    //   setDraggedIndex(index);
    };
  
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("hello")
    };

    const Top = () => {
      return (
        <div className={styles.Top}>
          {componentList.map((component, index) => (
            <div key={index} draggable="true" onDragStart={onDragStart(index)}>
              {component.children}
            </div>
          ))}
        </div>
      );
    };
  
    const Bottom = () => {
      return (
        <div onDrop={onDrop} onDragOver={e => e.preventDefault()}>
          bottom
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