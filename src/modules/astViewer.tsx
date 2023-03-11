import { useState } from "react";
import { convertNodeToJSON } from "../parser/convertNodeToJSON"
import { ParseStringtoNode } from "../parser/ParseStringtoNode"
import styles from './astViewer.module.css'

export const AstViewer = () => {

    const [text, setText] = useState({
        text:`<div style={{color:"black", backgroundColor:"white"}} className="classname1">this is text <div> siblings <div> first siblings nested <div> first siblings second nested </div> </div> test </div> last<i>second siblings</i>Another example</div>`,
    })

    const handleText = (event:any) => {
        setText({text:event.target.value});
        console.log(event.target.value)
    }
       
    const reactElements = ParseStringtoNode(text.text);
    
    return(
        <div className={styles.container}>
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
                test
                <pre>{JSON.stringify(convertNodeToJSON(ParseStringtoNode(text.text)), null , 2)}</pre>
            </div>
        </div>
    )
}