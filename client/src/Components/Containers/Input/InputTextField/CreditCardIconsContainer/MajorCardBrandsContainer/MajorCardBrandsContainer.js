import React from 'react'
import styles from './MajorCardBrandsContainer.module.css'
import FadeIn from 'react-fade-in'
import VisaIcon from '../Credit Card Icons/visa-icon.svg'
import MasterCardIcon from '../Credit Card Icons/mastercard-icon.svg'
import AmexIcon from '../Credit Card Icons/amex-icon.svg'


const MajorCardBrandsContainer = props => {

    return (
        <div className={styles.CreditCardIconsContainer}>
            <img className={styles.creditCardIcon} src={VisaIcon} />
            <img className={styles.creditCardIcon} src={MasterCardIcon} />
            <img className={styles.creditCardIcon} src={AmexIcon} />
        </div>
    )
    
}

export default React.memo(MajorCardBrandsContainer)