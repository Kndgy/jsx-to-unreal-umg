import styles from './editor.module.css'

export const Editor = () => {
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
                    <textarea className={styles.input}/>
                </div>
                <div className={styles.result}>
                    result
                </div>
            </div>
        </div>
    )
}