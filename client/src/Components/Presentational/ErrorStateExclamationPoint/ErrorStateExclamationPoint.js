import styles from './ErrorStateExclamationPoint.module.css'
import React from 'react'

const ErrorStateExclamationPoint = (props) => {

    return (
        <div className={styles.ErrorStateExclamationWrapper}>
            <span className={props.displayed ? `${styles.errorStatePointerContainer} ${styles.visible}` : `${styles.errorStatePointerContainer}`}>
                <span className={styles.errorStatePointer}>!</span>
            </span>
        </div>
    )
    
}

export default React.memo(ErrorStateExclamationPoint)