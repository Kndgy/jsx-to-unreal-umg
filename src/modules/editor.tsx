import React, {useState } from 'react'
import styles from './editor.module.css'
import { ComponentProps, ComponentsBar } from './componentsBar/componentsBar'
import { AstViewer } from './astViewer'


export const Editor = () => {
    // console.log(reactElements)

    const handleDrop = () => {
      // console.log(componentData.children);
      console.log("hello")
    };

    return(
        <div className={styles.editor}>
            <div className={styles.sideBar}>
                <div className={styles.pickerTab}>
                    placeholder
                </div>
                <div className={styles.bottomTab}>
                    <ComponentsBar onDropCallback={handleDrop} />
                </div>
            </div> 
            <div className={styles.content}>
                <AstViewer/>
            </div>
            {/* <div className={styles.widgets}>
              middle
            </div>
            <div className={styles.properties}>
              properties
            </div> */}
        </div>
    )
}