import styles from './AmountToPayTextField.module.css'
import React, { Component } from 'react'
import ContactFormSVG from '../../../../Assets/contact-form.svg'
import ErrorStateExclamationPoint from '../../../Presentational/ErrorStateExclamationPoint/ErrorStateExclamationPoint'

class AmountToPayTextField extends Component {

    state = {
        inputtedText: "",
        isFocused: false
    }

    constructor(props) {
        super(props)
        
        this.textFieldRef = React.createRef(null)
    }

    handleClick = event => {
        if (event.target !== this.textFieldRef.current) {
            event.preventDefault()
        }

        if (this.state.isFocused) {
            return;
        }

        this.textFieldRef.current.focus()

        this.setState({
            isFocused: !this.state.isFocused
        })
    }

    setActiveHandler = () => {
        this.setState({
            isFocused: true
        })
    }

    onBlurHandler = () => {
        this.setState({
            isFocused: !this.state.isFocused
        })
    }

    formatInputtedText = event => {
        const regex = /^([1-9]{1}\d{0,2})?$/
        if (regex.test(event.target.value)) {
            this.setState({
                inputtedText: event.target.value
            })
        } else {
            event.target.value = this.state.inputtedText
        }
        this.props.textChanged(event.target.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isFocused !== nextState.isFocused || this.props.errorState !== nextProps.errorState
    }

    render() {
        return (
            <div className={styles.ComponentContainer}>
                <div className={this.state.isFocused ? `${styles.amountToPayTextFieldContainerWrapper} ${styles.focusedWrapper}` : `${styles.amountToPayTextFieldContainerWrapper}` }>
                    <div className={this.state.isFocused ? `${styles.amountToPayTextFieldContainer} ${styles.focused} `: this.props.errorState ? `${styles.amountToPayTextFieldContainer} ${styles.errorState}` : `${styles.amountToPayTextFieldContainer}` } onMouseDown={(event) => {
                        this.handleClick(event)
                    }}>
                        <div className={styles.dollarSignContainer}>
                            <span className={styles.dollarSign}>$</span>
                        </div>
                        <div className={styles.textFieldContainer}>
                            <div className={styles.amountToPayText}>Enter amount to pay*</div>
                            <input className={styles.inputTextField} ref={this.textFieldRef} type="text" inputMode="numeric" placeholder="0.00" onChange={(event) => {this.formatInputtedText(event)}} onFocus={this.setActiveHandler} onBlur={this.onBlurHandler} />
                            <div className={`${styles.errorStateExclamationWrapper}`}>
                                <ErrorStateExclamationPoint displayed={!this.state.isFocused && this.props.errorState} />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className={styles.contactFormSVGContainer}>
                    <img className={styles.contactFormSVG} src={ContactFormSVG} />
                </div>
            </div>
        )
    }

}

export default AmountToPayTextField;