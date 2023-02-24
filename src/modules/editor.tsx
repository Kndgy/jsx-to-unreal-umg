import { useState } from 'react'
import styles from './editor.module.css'

export const Editor = () => {

    const [text, setText] = useState('')

    const handleText = (event:any) => {
        setText(event.target.value);
        console.log(event.target.value)
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
                        value={text}
                        onChange={handleText}
                    />
                </div>
                <div className={styles.result}>
                    {text}
                </div>
            </div>
        </div>
    )
}