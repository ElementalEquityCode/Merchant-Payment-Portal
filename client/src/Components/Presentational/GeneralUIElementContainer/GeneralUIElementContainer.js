import styles from './GeneralUIElementContainer.module.css'
import React from 'react'

const GeneralUIElementContainer = props => {

    return (
        <div className={styles.GeneralUIElementContainer}>
            {props.children}
        </div>
    )
    
}

export default React.memo(GeneralUIElementContainer)