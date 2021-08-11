import React, { PureComponent } from 'react'
import styles from './MobilePhonesCardBrandsContainer.module.css'
import VisaIcon from '../Credit Card Icons/visa-icon.svg'
import MasterCardIcon from '../Credit Card Icons/mastercard-icon.svg'
import AmexIcon from '../Credit Card Icons/amex-icon.svg'
import DinersClubIcon from '../Credit Card Icons/diners-club-icon.svg'
import DiscoverIcon from '../Credit Card Icons/discover-icon.svg'
import JCBIcon from '../Credit Card Icons/jcb-icon.svg'
import UnionPayIcon from '../Credit Card Icons/union-pay-icon.svg'

class MobilePhonesCardBrandsContainer extends PureComponent {

    constructor(props) {
        super(props)
        this.domNodeRef = React.createRef(null)
    }

    state = {
        currentlyDisplayedImage: 0
    }

    images = [VisaIcon, MasterCardIcon, AmexIcon, DinersClubIcon, DiscoverIcon, JCBIcon, UnionPayIcon]

    changeCardBrandIconTimer = null

    updateDOMNodeClassListToVisible = () => {
        if (this.domNodeRef.current !== null) {
            this.domNodeRef.current.classList.add(`${styles.visible}`)
        }
    }

    updateDOMNodeClassListToInvisible = () => {
        if (this.domNodeRef.current !== null) {
            this.domNodeRef.current.classList.remove(`${styles.visible}`)
        }
    }

    render() {
        return (
            <div className={styles.CreditCardIconsContainer}>
                <img ref={this.domNodeRef} className={styles.creditCardIcon} src={this.images[this.state.currentlyDisplayedImage]} />
            </div>
        )
    }

    componentDidMount = () => {
        this.updateDOMNodeClassListToVisible()

        setTimeout(() => {
            this.updateDOMNodeClassListToInvisible()
        }, 2000)

        this.changeCardBrandIconTimer = setInterval(() => {

            this.setState((oldState, props) => {
                return {
                    currentlyDisplayedImage: oldState.currentlyDisplayedImage === 6 ? 0 : oldState.currentlyDisplayedImage + 1
                }
            })

        }, 2500)
    }

    componentDidUpdate = () => {
        this.updateDOMNodeClassListToVisible()
        setTimeout(() => {
            this.updateDOMNodeClassListToInvisible()
        }, 2000)
    }

    componentWillUnmount = () => {
        clearInterval(this.changeCardBrandIconTimer)
    }
    
}

export default MobilePhonesCardBrandsContainer