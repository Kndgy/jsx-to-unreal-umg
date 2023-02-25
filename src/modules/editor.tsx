import { createRef, useEffect, useState } from 'react'
import { renderToStaticMarkup } from "react-dom/server";
import styles from './editor.module.css'
import { convertNodeToJSON } from '../parser/convertNodeToJSON'

export const Editor = () => {

    //handle separate string and html element
    const [text, setText] = useState({
        text:"<div>this is text</div>",
        element:<></>
    })

    const handleText = (event:any) => {
        setText({text:event.target.value, element: <div>test</div> });
        console.log(event.target.value)
    }
    console.log(text.element)
    console.log(<div>test</div>)
    
    //dynamically extract tag and content in between
    function trimStringTags(str: string): { tagName: string, content: string }[] {
        const pattern = /<(\w+)>(.*?)<\/\1>/g;
        const matches = [];
        let match;
        while ((match = pattern.exec(str))) {
          matches.push({ tagName: match[1], content: match[2] });
        }
        return matches;
    }
    const str = "start should be ignored <example>text</example> with <multiple>multiple</multiple> end should be ignored too.";
    const trimmed = trimStringTags(str);
    console.log(trimmed);
    // Output: [ { tagName: 'example', content: 'text' }, { tagName: 'multiple', content: 'multiple' } ]
    
    //html rendered finished, check above comments
    interface Props {
        htmlString: string;
        tag: string;
      }
      function RenderHtmlTag({ htmlString, tag }: Props) {
        const Tag = tag as keyof JSX.IntrinsicElements;
        return <Tag>{htmlString}</Tag>;
      }
      const htmlString = "This is some <b>bold</b> text.";
      const tag = "div";
      console.log(RenderHtmlTag({htmlString: htmlString, tag: tag}))

    return(
        <div className={styles.editor}>
            <div className={styles.sideBar}>
                <div className={styles.pickerTab}>
                    placeholder
                </div>
                <div className={styles.bottomTab}>
                    placeholder
                </div>
            </div> 
            <div className={styles.content}>
                <div className={styles.inputContainer}>
                    <textarea 
                        className={styles.input}
                        id='text'
                        value={text.text}
                        onChange={handleText}
                    />
                </div>
                <div className={styles.result}>
                    <pre>{JSON.stringify(convertNodeToJSON(RenderHtmlTag({htmlString: htmlString, tag: tag})), null , 2)}</pre>
                </div>
            </div>
        </div>
    )
}