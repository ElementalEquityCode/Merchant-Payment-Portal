import styles from './ModalContainer.module.css'
import React, { useEffect } from 'react'

const ModalContainer = props => {
    
    return (
        <div className={styles.ModalContainer}>{props.children}</div>
    )
}

export default React.memo(ModalContainer)