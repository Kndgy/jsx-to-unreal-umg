import React, {useState} from "react";
import styles from "./componentsBar.module.css"

type ComponentProps = {
    index: number;
    children: React.ReactNode;
}

const ComponentList: ComponentProps[] = [
    {
        index: 0, 
        children:<>zero</>
    },
    {
        index: 1, 
        children:<>one</>
    },
    {
        index: 2, 
        children:<>three</>
    } 
]

const Top = () => {
    const [componentList, setComponentList] = useState(ComponentList);
  
    const onDragStart = (e:any) => {
      console.log(e.target)
    };
  
    return (
      <div className={styles.Top}>
        {componentList.map((component, index) => (
          <div key={index} draggable="true" onDragStart={onDragStart}>
            {component.children}
          </div>
        ))}
      </div>
    );
  };

type BottomProps = {
    draggedElement?: ComponentProps;
}

const Bottom = ({draggedElement}:BottomProps) => {
    return(
        <div>
            bottom
            {draggedElement && (
                <div>
                    Dragged element: {draggedElement.children} (index: {draggedElement.index})
                </div>
            )}
        </div>
    )
}

export const ComponentsBar = () => {
  
    return (
      <div className={styles.parent}>
        <Top />
        <Bottom/>
      </div>
    );
  }