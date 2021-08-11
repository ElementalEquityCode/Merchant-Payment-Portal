import styles from './CompanyNameAndLogo.module.css'
import CompanyLogo from '../../../Assets/company-logo.svg'
import React from 'react'

const CompanyNameAndLogo = props => {

    return (
        <div className={styles.CompanyNameAndLogo}>
            <img src={CompanyLogo} alt="" />
            <span className={styles.companyName}>{props.businessName}</span>
        </div>
    )
    
}

export default React.memo(CompanyNameAndLogo);