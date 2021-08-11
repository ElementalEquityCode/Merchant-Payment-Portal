import styles from './InputTextFieldContainer.module.css'
import React from 'react'

const InputTextFieldContainer = props => {

    return (
        <div className={styles.Container}>
            <div className={styles.headerContainer}>
                {props.containerText !== undefined ? <div className={styles.containerText}>{props.containerText}</div> : null}
                <span className={props.shouldDisplayRequired ? `${styles.requiredText} ${styles.visible}` : `${styles.requiredText}`}>Required</span>
            </div>
            {props.children}
        </div>
    )
    
}

export default React.memo(InputTextFieldContainer)