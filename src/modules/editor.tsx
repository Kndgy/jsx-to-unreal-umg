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
    
    //dynamically extract tag and content in between
    function trimStringTags(str: string): { tag: string, htmlString: string }[] {
        const pattern = /<(\w+)>(.*?)<\/\1>/g;
        const matches = [];
        let match;
        while ((match = pattern.exec(str))) {
          matches.push({ tag: match[1], htmlString: match[2] });
        }
        return matches;
    }
    /*example usage
    const str = "start should be ignored <example>text</example> with <multiple>multiple</multiple> end should be ignored too.";
    const trimmed = trimStringTags(str);
    */
    // Output: [ { tagName: 'example', content: 'text' }, { tagName: 'multiple', content: 'multiple' } ]

    const trimmed = trimStringTags(text.text);
    
    interface Props {
        htmlString: string;
        tag: string;
        key?: string | number | null;
    }

    function RenderHtmlTag({ htmlString, tag, key }: Props) {
        const Tag = tag as keyof JSX.IntrinsicElements;
        return <Tag key={key}>{htmlString}</Tag>;
    }

    /*example usage
    const htmlString = "This is some bold text.";
    const tag = "div";
    console.log(RenderHtmlTag({htmlString: htmlString, tag: tag}))
    */

    interface Props {
        tag: string;
        htmlString: string;
    }
    
    interface TagProps {
        tagList: Props[];
    }
    
    function RenderHtmlTags({ tagList }: TagProps) {
        return (
            <>
            {tagList.map((tagProps, index) => (RenderHtmlTag({htmlString:tagProps.htmlString, tag:tagProps.tag, key:index})))}
            </>
        );
    }

    // console.log(RenderHtmlTags({tagList:trimmed}))
    // console.log(convertNodeToJSON(RenderHtmlTags({tagList:trimmed})))

    const codeCheck = () => {
        
    }
    
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
                    <pre>{JSON.stringify(convertNodeToJSON(RenderHtmlTags({tagList:trimmed})), null , 2)}</pre>
                </div>
            </div>
        </div>
    )
}