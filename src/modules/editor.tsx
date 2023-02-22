import styles from './editor.module.css'

export const Editor = () => {
    return(
        <div className={styles.editor}>
            <div className={styles.sideBar}>
                <div className={styles.pickerTab}>
                    top
                </div>
                <div className={styles.bottomTab}>
                    bottom
                </div>
            </div> 
            <div className={styles.content}>
                editor
            </div>
        </div>
    )
}