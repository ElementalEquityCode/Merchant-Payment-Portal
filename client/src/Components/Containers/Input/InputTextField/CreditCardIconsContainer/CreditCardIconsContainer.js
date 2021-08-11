import React, { Component, PureComponent } from 'react'
import styles from './CreditCardIconsContainer.module.css'
import MajorCardBrandsContainer from './MajorCardBrandsContainer/MajorCardBrandsContainer'
import MinorCardBrandsContainer from './MinorCardBrandsContainer/MinorCardBrandsContainer'
import MobilePhonesCardBrandsContainer from './MobilePhonesCardBrandsContainer/MobilePhonesCardBrandsContainer'
import EnteredCardBrandContainer from './EnteredCardBrandContainer/EnteredCardBrandContainer'
import CardBrandContext from '../../../../../Context/CardBrandContext'
import FadeIn from 'react-fade-in'

class CreditCardIconsContainer extends PureComponent {

    state = {
        screenSize: null
    }

    static contextType = CardBrandContext

    renderLargeScreensCardBrandsContainer = () => {
        return (
            <div className={styles.cardBrandsContainer}>
                <MajorCardBrandsContainer />
                <MinorCardBrandsContainer />
            </div>
        )
    }

    renderMobilePhonesCardBrandsContainer = () => {
        return <MobilePhonesCardBrandsContainer />
    }

    render() {
        let component = null;

        if (this.context.cardBrand === 'unknown') {
            component = this.state.screenSize === null ? null : this.state.screenSize === "large" ? this.renderLargeScreensCardBrandsContainer() : this.renderMobilePhonesCardBrandsContainer()
        } else {
            component = <EnteredCardBrandContainer cardBrand={this.context.cardBrand} />
        }

        return component
    }

    componentDidMount = () => {
        let mediaQuery = window.matchMedia('(max-width: 450px)')
        mediaQuery.addListener(this.mediaQueryHandler)
        this.mediaQueryHandler()
    }

    mediaQueryHandler = () => {
        if (window.innerWidth <= 450) {
            this.setState({
                screenSize: 'small'
            })
        } else {
            this.setState({
                screenSize: 'large'
            })
        }
    }
    
}

export default CreditCardIconsContainer