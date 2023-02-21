import styles from './editor.module.css'

export const Editor = () => {
    return(
        <div className={styles.editor}>
            <div className={styles.sideBar}>
                side bar
            </div> 
            <div className={styles.content}>
                editor
            </div>
        </div>
    )
}