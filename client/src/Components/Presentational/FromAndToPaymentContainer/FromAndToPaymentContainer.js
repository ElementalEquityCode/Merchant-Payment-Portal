import styles from './FromAndToPaymentContainer.module.css'
import Separator from '../Separator/Separator.js'
import React, { useEffect } from 'react'

const FromAndToPaymentContainer = props => {

    return (
        <div className={styles.FromAndToPaymentContainer}>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.rawText}>To</td>
                        <td style={{width: '100%', lineBreak: 'anywhere'}} className={styles.nameText}>{props.businessName}</td>
                    </tr>
                    <tr>
                        <td className={styles.rawText}>From</td>
                        <td style={{width: '100%', lineBreak: 'anywhere'}} className={styles.nameText}>{props.customerName}</td>
                    </tr>
                </tbody>
            </table>
            <Separator />
        </div>
    )
    
}

export default React.memo(FromAndToPaymentContainer)