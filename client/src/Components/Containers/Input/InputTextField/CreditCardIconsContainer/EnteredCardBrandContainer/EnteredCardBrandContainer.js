import React, { useEffect, useRef } from 'react'
import styles from './EnteredCardBrandContainer.module.css'
import VisaIcon from '../Credit Card Icons/visa-icon.svg'
import MasterCardIcon from '../Credit Card Icons/mastercard-icon.svg'
import AmexIcon from '../Credit Card Icons/amex-icon.svg'
import DinersClubIcon from '../Credit Card Icons/diners-club-icon.svg'
import DiscoverIcon from '../Credit Card Icons/discover-icon.svg'
import JCBIcon from '../Credit Card Icons/jcb-icon.svg'
import UnionPayIcon from '../Credit Card Icons/union-pay-icon.svg'

const EnteredCardBrandContainer = props => {

    const cardBrand = props.cardBrand
    let image = null
    const domNodeRef = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            domNodeRef.current.classList.add(`${styles.visible}`)
        }, 100)
    }, [props.cardBrand])

    switch (cardBrand) {
        case "visa": image = VisaIcon
        break
        case "mastercard": image = MasterCardIcon
        break
        case "amex": image = AmexIcon
        break
        case "diners": image = DinersClubIcon
        break
        case "discover": image = DiscoverIcon
        break
        case "jcb": image = JCBIcon
        break
        case "unionpay": image = UnionPayIcon
    }

    return (
        <div className={styles.CreditCardIconsContainer}>
            <img ref={domNodeRef} className={styles.creditCardIcon} src={image} />
        </div>
    )
    
}

export default EnteredCardBrandContainer