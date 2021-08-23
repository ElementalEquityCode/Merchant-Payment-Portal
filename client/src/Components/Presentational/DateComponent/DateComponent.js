import styles from './DateComponent.module.css'
import React from 'react'

const DateComponent = () => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const fullMonth = months[month]

    const fullDate = fullMonth + ", " + day + " " + year

    return (
        <div className={styles.dateText}>{fullDate}</div>
    )
    
}

export default React.memo(DateComponent);