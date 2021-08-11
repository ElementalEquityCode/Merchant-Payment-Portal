import styles from './Footer.module.css'
import PoweredByStripeLogo from '../../../Assets/powered-by-stripe-white.svg'
import TwitterLogo from '../../../Assets/twitter-logo.svg'
import React from 'react'

const Footer = () => {

    return (
        <div className={styles.footerContainer}>
            <div className={styles.stripeLogoContainer}>
                <a href="https://stripe.com"><img src={PoweredByStripeLogo} /></a>
            </div>
            <div className={styles.twitterHandleContainer}>
                <span>Built by <a href="https://twitter.com/valenciabytes">@valenciabytes</a></span>
                <a href = "https://twitter.com/valenciabytes"><img className={styles.twitterLogo} src={TwitterLogo} /></a>
            </div>
        </div>
    )
    
}

export default React.memo(Footer)