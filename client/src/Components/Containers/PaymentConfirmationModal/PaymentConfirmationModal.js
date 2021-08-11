import React from 'react'
import ModalContainer from '../../Presentational/ModalContainer/ModalContainer'
import GeneralActionButton from '../Input/GeneralActionButton/GeneralActionButton'
import styles from './PaymentConfirmationModal.module.css'
import ContactFormSVG from '../../../Assets/contact-form.svg'
import Checkmark from '../../../Assets/checkmark.svg'

const PaymentConfirmationModal = props => {

    const unixTimestamp = new Date(props.paymentDate * 1000);
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const year = unixTimestamp.getFullYear();
    const month = months[unixTimestamp.getMonth()];
    const date = unixTimestamp.getDate();
    const fullDate = month + ", " + date + " " + year;

    let formattedAmountPaid = props.amountPaid

    if (props.amountPaid.length > 2) {
        formattedAmountPaid = props.amountPaid.substring(0, props.amountPaid.length - 2) + "." + props.amountPaid.substring(props.amountPaid.length - 2); 
    }

    return (
        <ModalContainer>
            <div className={styles.svgContainer}>
                <img className={styles.paymentConfirmationContactForm} src={ContactFormSVG} alt="" />
                <img className={styles.checkoutCheckmark} src={Checkmark} alt="" />
            </div>
            <div className={styles.containerFooter}>
                <div className={styles.invoicePaidText}>Service Paid</div>
                <div className={styles.amountPaidText}>${formattedAmountPaid}</div>

                <div className={styles.flexContainers}>
                <div className={styles.flexContainer}>
                    <div className={styles.firstColumnText}>
                        Confirmation Code
                    </div>
                    <div className={styles.secondColumnText}>
                        {props.confirmationCode}
                    </div>
                </div>

                <div className={styles.flexContainer}>
                    <div className={styles.firstColumnText}>
                        Payment Date
                    </div>
                    <div className={styles.secondColumnText}>
                        {fullDate}
                    </div>
                </div>

                <div className={styles.flexContainer}>
                    <div className={styles.firstColumnText}>
                        Payment Method
                    </div>
                    <div className={styles.secondColumnText}>
                        {String(props.paymentMethodCardBrand).charAt(0).toUpperCase() + props.paymentMethodCardBrand.substring(1)} •••• {props.lastFourOfPaymentMethod}
                    </div>
                </div>
                </div>
                <div className={styles.thankYouText}>Thank you for your payment</div>
            </div>
        </ModalContainer>
    )
    
}

export default PaymentConfirmationModal