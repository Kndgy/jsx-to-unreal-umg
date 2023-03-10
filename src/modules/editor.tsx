import React, {useState } from 'react'
import styles from './editor.module.css'
import { convertNodeToJSON } from '../parser/convertNodeToJSON'
import { ComponentProps, ComponentsBar } from './componentsBar/componentsBar'


export const Editor = () => {

    const [text, setText] = useState({
        text:`<div style={{color:"black", backgroundColor:"white"}} className="classname1">this is text <div> siblings <div> first siblings nested <div> first siblings second nested </div> </div> test </div> last<i>second siblings</i>Another example</div>`,
    })

    const handleText = (event:any) => {
        setText({text:event.target.value});
        console.log(event.target.value)
    }
    
    function createReactElements(str: string): React.ReactNode[] {
      const container = document.createElement("div");
      container.innerHTML = str;
      const childNodes = Array.from(container.childNodes);
      
      let keyIndex = 0;
    
      const parseNode = (node: Node): React.ReactNode => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const tagName = element.nodeName.toLowerCase();
          const className = element.hasAttribute("className") ? element.getAttribute("className") : undefined;
          const style = element.hasAttribute("style") ? parseStyleString(element.getAttribute("style")) : undefined;
          const childNodes = Array.from(element.childNodes);
          const children = childNodes.map((childNode) => parseNode(childNode)).filter((child) => child !== null);
          return React.createElement(tagName, { 
            key: `${keyIndex++}`,
            className: className,
            style: style
          }, children);
        } else {
          return null;
        }
      };
      
      const parseStyleString = (styleStr: string | null | undefined) => {
        if (!styleStr) return undefined;
      
        const styles = styleStr.split(';');
        const styleObj: { [key: string]: string } = {};
        for (let style of styles) {
          const [key, value] = style.split(':');
          if (key && value) {
            styleObj[key.trim()] = value.trim();
          }
        }
        return styleObj;
      }
       
      return childNodes.map((childNode) => parseNode(childNode)).filter((child) => child !== null);
    }
    
       
    const reactElements = createReactElements(text.text);
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
                    <pre>{JSON.stringify(convertNodeToJSON(createReactElements(text.text)), null , 2)}</pre>
                </div>
            </div>
        </div>
    )
}