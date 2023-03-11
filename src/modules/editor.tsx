import React, {useState } from 'react'
import styles from './editor.module.css'
import { convertNodeToJSON } from '../parser/convertNodeToJSON'
import { ComponentProps, ComponentsBar } from './componentsBar/componentsBar'
import { ParseStringtoNode } from '../parser/ParseStringtoNode'
import { AstViewer } from './astViewer'


export const Editor = () => {

    const [text, setText] = useState({
        text:`<div style={{color:"black", backgroundColor:"white"}} className="classname1">this is text <div> siblings <div> first siblings nested <div> first siblings second nested </div> </div> test </div> last<i>second siblings</i>Another example</div>`,
    })

    const handleText = (event:any) => {
        setText({text:event.target.value});
        console.log(event.target.value)
    }
    
       
    const reactElements = ParseStringtoNode(text.text);
    // console.log(reactElements)

    const handleDrop = (componentData: ComponentProps) => {
      console.log(componentData.children);
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
                {/* {reactElements} */}
                <div className={styles.inputContainer}>
                    <textarea 
                        className={styles.input}
                        id='text'
                        value={text.text}
                        onChange={handleText}
                    />
                </div>
                <div className={styles.result}>
                  <AstViewer text={text.text}/>
                </div>
            </div>
        </div>
    )
}