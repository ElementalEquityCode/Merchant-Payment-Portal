import React from 'react'
import styles from './PaymentError.module.css'
import { useEffect } from 'react'

const PaymentError = props => {

    return (
        <div className={styles.errorTextContainer}>
            <span className={styles.errorText}>
                {props.errorMessage}
            </span>
        </div>
    )
    
}

export default React.memo(PaymentError);