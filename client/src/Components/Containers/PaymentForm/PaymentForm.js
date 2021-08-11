import styles from './PaymentForm.module.css'
import { PureComponent } from 'react'
import DateComponent from '../../Presentational/DateComponent/DateComponent.js'
import InputTextFieldContainer from '../../Presentational/InputTextFieldContainer/InputTextFieldContainer.js'
import GeneralUIElementContainer from '../../Presentational/GeneralUIElementContainer/GeneralUIElementContainer.js'
import InputTextField from '../Input/InputTextField/InputTextField.js'
import GeneralActionButton from '../Input/GeneralActionButton/GeneralActionButton.js'
import ModalContainer from '../../Presentational/ModalContainer/ModalContainer.js'
import AmountToPayTextField from '../Input/AmounToPayTextField/AmountToPayTextField.js'
import FromAndToPaymentContainer from '../../Presentational/FromAndToPaymentContainer/FromAndToPaymentContainer.js'
import CompanyNameAndLogo from '../../Presentational/CompanyNameAndLogo/CompanyNameAndLogo.js'
import PaymentConfirmationModal from '../PaymentConfirmationModal/PaymentConfirmationModal.js'
import PaymentError from '../PaymentError/PaymentError.js'
import { ProductionInstance as axios } from '../../../Axios/session'
import CardBrandContext from '../../../Context/CardBrandContext'
import { CardNumberElement, Elements, ElementsConsumer, } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Footer from '../../Presentational/Footer/Footer.js'
import FadeIn from 'react-fade-in'
import PoweredByStripe from '../../../../src/Assets/powered-by-stripe-white.svg'

const validator = require('email-validator')
const stripePromise = loadStripe('')

class PaymentForm extends PureComponent {

  state = {
      amount: {
        value: "",
        isInErrorState: false
      },
      email: {
        value: "",
        isInErrorState: false
      },
      clientName: {
        value: "",
        isInErrorState: false
      },
      ccNumber: {
        isComplete: false,
        isInErrorState: false
      },
      expiryDate: {
        isComplete: false,
        isInErrorState: false
      },
      cvc: {
        isComplete: false,
        isInErrorState: false
      },
      isPayWithCardButtonActive: false,
      cardBrand: "unknown",
      isPaymentRequestProcessing: false,
      received200StatusCode: false,
      paymentErrorMessage: "",
      paymentConfirmation: {
        confirmationCode: "",
        paymentDate: "",
        paymentMethodCardBrand: "",
        lastFourOfPaymentMethod: ""
      }
    }
    
  amountChangedHandler = text => {
    this.setState({
      amount: {
        value: text + "",
        isInErrorState: text === "" ? true : false
      }
    }, () => {
      this.handleCheckFormInput()
    })
  }
    
  emailChangedHandler = text => {
    let newEmail = text
    
    if (validator.validate(newEmail)) {
      this.setState({
        email: {
          value: newEmail,
          isInErrorState: false
        }
      }, () => {
        this.handleCheckFormInput()
      })
    } else {
      this.setState({
        email: {
          value: "",
          isInErrorState: true
        }
      }, () => {
            this.handleCheckFormInput()
      })
    }
  }
    
  clientNameChangedHandler = text => {
    let newName = text

    if (newName !== "") {
      this.setState({
        clientName: {
          value: newName,
          isInErrorState: false
        }
      }, () => {
        this.handleCheckFormInput()
      })
    } else {
      this.setState({
        clientName: {
          value: "",
          isInErrorState: true
        }
      }, () => {
        this.handleCheckFormInput()
      })
    }
  }
    
  ccNumberChangedHandler = event => {
    this.setState({
      cardBrand: event.brand
    })

    if (event.complete) {
      this.setState({
        ccNumber: {
          isComplete: true,
          isInErrorState: false
        }
      }, () => {
        this.handleCheckFormInput()
      })
    } else {
      this.setState({
        ccNumber: {
          isComplete: false,
          isInErrorState: true
        }
      }, () => {
        this.handleCheckFormInput()
      })
    }
  }
    
  expiryDateChangedHandler = event => {
    if (event.complete) {
      this.setState({
        expiryDate: {
          isComplete: true,
          isInErrorState: false
        }
      }, () => {
        this.handleCheckFormInput()
      })
    } else {
      this.setState({
        expiryDate: {
          isComplete: false,
          isInErrorState: true
        }
      }, () => {
        this.handleCheckFormInput()
      })
    }
  }
    
  cvcChangedHandler = event => {
    if (event.complete) {
      this.setState({
        cvc: {
          isComplete: true,
          isInErrorState: false
        }
      }, () => {
        this.handleCheckFormInput()
      })
    } else {
      this.setState({
        cvc: {
          isComplete: false,
          isInErrorState: true
        }
      }, () => {
        this.handleCheckFormInput()
      })
    }
  }
    
  handleCheckFormInput = () => {
    if (this.state.amount.value !== "" && this.state.email.value !== "" && this.state.clientName.value !== "" && this.state.ccNumber.isComplete && this.state.expiryDate.isComplete && this.state.cvc.isComplete) {
      this.setState({
        isPayWithCardButtonActive: true
      })
    } else {
      this.setState({
        isPayWithCardButtonActive: false
      })
    }
    this.setState({
      paymentErrorMessage: ""
    })
  }
    
  handlePayButtonClick = () => {
    if (this.state.amount.value === "") {
      this.setState({
        amount: {
          value: "",
          isInErrorState: true
        }
      })
    }
    if (this.state.email.value === "") {
      this.setState({
        email: {
          value: "",
          isInErrorState: true
        }
      })
    }
    if (this.state.clientName.value === "") {
      this.setState({
        clientName: {
          value: "",
          isInErrorState: true
        }
      })
    }
    if (this.state.ccNumber.isComplete) {
      this.setState({
        ccNumber: {
          isComplete: true,
          isInErrorState: false
        }
      })
    } else {
      this.setState({
        ccNumber: {
          isComplete: false,
          isInErrorState: true
        }
      })
    }
    if (this.state.expiryDate.isComplete) {
      this.setState({
        expiryDate: {
          isComplete: true,
          isInErrorState: false
        }
      })
    } else {
      this.setState({
        expiryDate: {
          isComplete: false,
          isInErrorState: true
        }
      })
    }
    if (this.state.cvc.isComplete) {
      this.setState({
        cvc: {
          isComplete: true,
          isInErrorState: false
        }
      })
    } else {
      this.setState({
        cvc: {
          isComplete: false,
          isInErrorState: true
        }
      })
    }
  }
    
  formSubmissionHandler = async (elements, stripe) => {
    if (this.state.isPaymentRequestProcessing || !this.state.isPayWithCardButtonActive) {
      return
    }

    this.setState({
      isPaymentRequestProcessing: true
    })

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardNumberElement)

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    if (error) {
      this.handleErrorMessageFromStripeAPIOrServer(error)
    } else {
      this.performHTTPRequest(paymentMethod, stripe)
    }
  }

  performHTTPRequest = (paymentMethod, stripe) => {
    const payload = {
      email: this.state.email.value, 
      name: this.state.clientName.value, 
      amountToPay: this.state.amount.value
    }

    axios.post('/create-payment-intent', payload).then(response => {
      this.handle200StatusCodeFromServer(stripe, paymentMethod, response.data.clientSecret)
    }).catch(error => {
      this.handleErrorMessageFromStripeAPIOrServer(error)
    })
  }

  handle200StatusCodeFromServer = (stripe, paymentMethod, paymentClientSecret) => {        
    stripe.confirmCardPayment(paymentClientSecret, {
      payment_method: paymentMethod.id
    }).then((result) => {
        if (result.error) {
          this.handleErrorMessageFromStripeAPIOrServer(result.error.message)
        } else {
          this.setState({
            isPaymentRequestProcessing: false,
            received200StatusCode: true,
            paymentConfirmation: {
              amountPaid: result.paymentIntent.amount,
              confirmationCode: result.paymentIntent.id + "",
              paymentDate: result.paymentIntent.created,
              paymentMethodCardBrand: paymentMethod.card.brand + "",
              lastFourOfPaymentMethod: paymentMethod.card.last4 + ""
            }
          })
        }
      })
  }
    
  handleErrorMessageFromStripeAPIOrServer = errorMessage => {
    this.setState({
      isPaymentRequestProcessing: false,
      paymentErrorMessage: errorMessage + ""
    })
  }
    
  renderPaymentForm = (elements, stripe) => {
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        this.formSubmissionHandler(elements, stripe)
      }}>
        <FadeIn delay="100" transitionDuration="800">
          <center><a href="https://stripe.com"><img src={PoweredByStripe} height="20"/></a></center>
          <ModalContainer>
            <DateComponent />
            <GeneralUIElementContainer>
              <AmountToPayTextField
                textChanged={(event) => this.amountChangedHandler(event)}
                errorState={this.state.amount.isInErrorState}
              />
            </GeneralUIElementContainer>
            <GeneralUIElementContainer>
              <FromAndToPaymentContainer
                businessName="Ian Robinson"
                customerName={this.state.clientName.value}
              />
            </GeneralUIElementContainer>
          </ModalContainer>
        </FadeIn>

        <FadeIn delay="900" transitionDuration="800">
          <div>
          <ModalContainer>
            <InputTextFieldContainer
              containerText="Client Information"
              shouldDisplayRequired={
                this.state.email.isInErrorState |
                this.state.clientName.isInErrorState
              }
            >
              <InputTextField
                type="email"
                changeEvent={this.emailChangedHandler}
                errorState={this.state.email.isInErrorState}
              />
              <InputTextField
                type="name"
                changeEvent={this.clientNameChangedHandler}
                errorState={this.state.clientName.isInErrorState}
              />
            </InputTextFieldContainer>

            <InputTextFieldContainer containerText="Card Information"
              shouldDisplayRequired={
                this.state.ccNumber.isInErrorState |
                this.state.expiryDate.isInErrorState |
                this.state.cvc.isInErrorState
              }
            >
              <div className={this.state.isPaymentRequestProcessing ? `${styles.paymentInformationFieldsContainer} ${styles.overlay}` : `${styles.paymentInformationFieldsContainer}`}>
                <CardBrandContext.Provider value={{cardBrand:this.state.cardBrand}}>
                  <InputTextField
                      shouldDisplayOverlay={this.state.isPaymentRequestProcessing}
                      type="cc"
                      changeEvent={(event) => {
                        this.ccNumberChangedHandler(event)
                      }}
                      errorState={this.state.ccNumber.isInErrorState}
                  />
                </CardBrandContext.Provider>
                <InputTextField
                  shouldDisplayOverlay={this.state.isPaymentRequestProcessing}
                  type="date"
                  changeEvent={(event) => {
                    this.expiryDateChangedHandler(event)
                  }}
                  errorState={this.state.expiryDate.isInErrorState}
                />
                <InputTextField
                  shouldDisplayOverlay={this.state.isPaymentRequestProcessing}
                  type="cvc"
                  changeEvent={(event) => {
                    this.cvcChangedHandler(event)
                  }}
                  errorState={this.state.cvc.isInErrorState}
                />
              </div>
            </InputTextFieldContainer>
            {this.renderPaymentErrorComponent()}
            <GeneralUIElementContainer>
              <GeneralActionButton isActive={this.state.isPayWithCardButtonActive} isProcessingPayment={this.state.isPaymentRequestProcessing} text={this.state.isPaymentRequestProcessing ? "Processing..." : this.state.amount.value === "" ? "Enter Amount To Pay" : "Pay $" + this.state.amount.value} onClickHandler={this.handlePayButtonClick} />
            </GeneralUIElementContainer>
          </ModalContainer>
          </div>
        </FadeIn>
      </form>
    )
  }
    
  renderPaymentErrorComponent = () => {
    return (
      <div className={this.state.paymentErrorMessage !== "" ? `${styles.paymentErrorAnimationContainer} ${styles.visible}` : `${styles.paymentErrorAnimationContainer}`}>
        <PaymentError errorMessage={this.state.paymentErrorMessage} />
      </div>
    )
  }
    
  renderPaymentConfirmationModal = () => {
    return (
      <FadeIn transitionDuration="400">
        <PaymentConfirmationModal amountPaid={String(this.state.paymentConfirmation.amountPaid)} confirmationCode={this.state.paymentConfirmation.confirmationCode} paymentDate={this.state.paymentConfirmation.paymentDate} paymentMethodCardBrand={this.state.paymentConfirmation.paymentMethodCardBrand} lastFourOfPaymentMethod={this.state.paymentConfirmation.lastFourOfPaymentMethod} />
      </FadeIn>
    )
  }
    
  InjectedForm = () => {
    return (
      <ElementsConsumer>
        {({elements, stripe}) => {
          return this.renderPaymentForm(elements, stripe)
        }}
      </ElementsConsumer>
    )
  }
    
  render = () => {
    const jsx = !this.state.received200StatusCode ? this.InjectedForm() : this.renderPaymentConfirmationModal()

    if (!this.state.received200StatusCode) {
      return (
        <Elements stripe={stripePromise}>
          <div id="Root">
            {jsx}
          </div>
        </Elements>
      )
    } else {
      return (
        <div id="Root">
          {jsx}
        </div>
      )
    }
  }
  
}

export default PaymentForm