import styles from './InputTextField.module.css'
import React, { Component } from 'react'
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import CVCIcon from '../../../../Assets/cvc-icon.svg'
import CreditCardIconsContainer from './CreditCardIconsContainer/CreditCardIconsContainer.js'
import ErrorStateExclamationPoint from '../../../Presentational/ErrorStateExclamationPoint/ErrorStateExclamationPoint'

class InputTextField extends Component {

    style = {
        style: {
            base: {
                color: 'rgba(26,26,26,.9)',
                fontSize: '16px',
                fontWeight: '200',
                backgroundColor: 'rgba(0,0,0,0)',
                lineHeight: '2.4em',
                height: '38px'
            },
            invalid: {
                color: 'rgb(235, 56, 42)'
            }
        }
    }

    state = {
        isFocused : false,
        inputtedText: null
    }

    constructor (props) {
        super(props)
        
        this.textFieldRef = React.createRef(null)
    }

    handleClick = event => {
        if (this.props.shouldDisplayOverlay) {
            return
        }

        if (event.target !== this.textFieldRef.current) {
            event.preventDefault()
        }

        if (!this.state.isFocused && (this.textFieldRef !== null || this.textFieldRef.current !== null)) {
            if (this.props.type === "email" || this.props.type === "name") {
                this.textFieldRef.current.focus()
            } else {
                this.textFieldRef.focus()
            }
            this.setState({
                isFocused: true
            })
        }
    }

    setActiveHandler = () => {
        this.setState({
            isFocused: true
        })
    };

    onBlurHandler = () => {
        this.setState({
            isFocused: false
        })
    }

    formatInputtedText = event => {
        if (this.props.type === 'name' || this.props.type === 'email') {
            if (event.target.value === " ") {
                event.target.value = ""
            }

            if (this.props.type === "email") {
                if (event.target.value.includes(" ")) {
                    event.target.value = event.target.value.replace(" ", "")
                }
            }
        }
        this.props.changeEvent(event.target.value)
        this.setState({
            inputtedText: event.target.value + ""
        })
    }

    renderInputFields = () => {
        let inputTextFieldContainer = [`${styles.InputTextField}`];
        let textFieldContainerClassNames = [`${styles.textFieldContainerView}`];

        let inputField = null;
        
        if (this.state.isFocused) {
            inputTextFieldContainer.push(`${styles.focusedInputTextField}`)
            textFieldContainerClassNames.push(`${styles.focusedTextFieldContainerView}`)
        } else if (!this.state.isFocused && this.props.errorState) {
            inputTextFieldContainer.push(`${styles.errorStateInputTextField}`);
        }

        if (this.props.shouldDisplayOverlay) {
            textFieldContainerClassNames.push(`${styles.paymentProcessingTextFieldContainerView}`)
        }

        if (this.props.type === 'cc') {
            inputTextFieldContainer.push(`${styles.ccInputTextField}`);
            textFieldContainerClassNames.push(`${styles.ccTextFieldContainerView}`);
            inputField = <CardNumberElement options={{...this.style, disabled: this.props.shouldDisplayOverlay}} onChange={(event) => {this.props.changeEvent(event)}} onReady={(ref) => {this.textFieldRef = ref}} className={`${styles.textField}`} onFocus={this.setActiveHandler} onBlur={this.onBlurHandler} />
        } else if (this.props.type === 'date') {
            inputTextFieldContainer.push(`${styles.dateInputTextField}`);
            textFieldContainerClassNames.push(`${styles.dateTextFieldContainerView}`);
            inputField = <CardExpiryElement options={{...this.style, disabled: this.props.shouldDisplayOverlay}} onChange={(event) => {this.props.changeEvent(event)}} onReady={(ref) => {this.textFieldRef = ref}} className={`${styles.textField}`} onFocus={this.setActiveHandler} onBlur={this.onBlurHandler} />
        } else if (this.props.type === 'cvc') {
            inputTextFieldContainer.push(`${styles.cvcInputTextField}`);
            textFieldContainerClassNames.push(`${styles.cvcTextFieldContainerView}`);
            inputField = <CardCvcElement options={{...this.style, disabled: this.props.shouldDisplayOverlay}} onChange={(event) => {this.props.changeEvent(event)}} onReady={(ref) => {this.textFieldRef = ref}} className={`${styles.textField}`} onFocus={this.setActiveHandler} onBlur={this.onBlurHandler} />
        } else if (this.props.type === 'email') {
            inputTextFieldContainer.push(`${styles.fullWidthInputTextField}`);
            textFieldContainerClassNames.push(`${styles.fullWidthTextFieldContainerView}`);
            inputField = <input type="text" inputMode="email" maxLength="30" autocapitalize="off" style={this.style.style.base} placeholder="Email" ref={this.textFieldRef} className={styles.textField} onChange={(event) => {this.formatInputtedText(event)}} onFocus={this.setActiveHandler} onBlur={this.onBlurHandler} />
        } else if (this.props.type === 'name') {
            inputTextFieldContainer.push(`${styles.fullWidthInputTextField}`);
            textFieldContainerClassNames.push(`${styles.fullWidthTextFieldContainerView}`);
            inputField = <input type="text" maxLength="30" style={this.style.style.base} placeholder="Name" ref={this.textFieldRef} className={styles.textField} onChange={(event) => {this.formatInputtedText(event)}} onFocus={this.setActiveHandler} onBlur={this.onBlurHandler} />
        }

        return (
            <div className={inputTextFieldContainer.join(' ')} onMouseDown={(event) => {
                this.handleClick(event)
            }}>
                <div className={textFieldContainerClassNames.join(' ')}>
                    {inputField}
                </div>
                {this.renderIconsContainer()}
            </div>
        );
    }

    renderIconsContainer = () => {
        return (
            <div className={styles.iconsContainer}>
                {this.props.type === 'cc'  ? <div className={!this.state.isFocused && this.props.errorState ? `${styles.icon} ${styles.invisible}` : `${styles.icon}`}><CreditCardIconsContainer /></div> : this.props.type === 'cvc' ? <img className={!this.state.isFocused && this.props.errorState ? `${styles.icon} ${styles.invisible}` : `${styles.icon}`} src={CVCIcon} alt="" width="20" /> : null }
                <ErrorStateExclamationPoint displayed={!this.state.isFocused && this.props.errorState} />
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.type === 'name' || this.props.type === 'email') {
            return this.props.errorState !== nextProps.errorState || this.state.isFocused !== nextState.isFocused
        } else {
            return this.props.errorState !== nextProps.errorState || this.state.isFocused !== nextState.isFocused || this.props.shouldDisplayOverlay !== nextProps.shouldDisplayOverlay || this.state.inputtedText !== nextState.inputtedText
        }
    }
   
    render() {
        return this.renderInputFields()
    }
    
}

export default InputTextField;