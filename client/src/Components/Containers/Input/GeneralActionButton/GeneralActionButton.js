import styles from './GeneralActionButton.module.css';
import React, { Component } from 'react';
import Lottie from 'react-lottie';
import LockSVG from '../../../../Assets/lock.svg';
import LoadingAnimation from '../../../../Assets/loading-animation.json';

class GeneralActionButton extends React.PureComponent {
    
    state = {
        isCurrentlyClicked: false
    }
 
    onMouseClickPress = () => {
        this.setState({
            isCurrentlyClicked: true
        })
    }

    onMouseClickRelease = () => {
        this.setState({
            isCurrentlyClicked: false
        })
    }

    handleOnMouseLeave = () => {
        if (this.state.isCurrentlyClicked) {
            this.setState({
                isCurrentlyClicked: false
            })
        }
    }

    renderLottieAnimation = () => {
        let animationOptions = {
            loop: true,
            autoplay: true,
            animationData: LoadingAnimation
        }

        return (
            <div className={styles.lottieContainer}>
                <Lottie options={animationOptions} height={40} width={40} />
            </div>
        )
    }

    renderLockContainer = () => {
        return (
            <div className={styles.lockContainer}>
                <img className={this.props.isActive ? `${styles.lock} ${styles.visible}` : `${styles.lock}`} src={LockSVG} alt="" />
            </div>
        )
    }

    renderPayWithCardButton = () => {
        return (
            <div className={styles.buttonContentsContainer}>
                <div className={this.props.isProcessingPayment ? `${styles.buttonTextContainer} ${styles.withLottiePadding}` : `${styles.buttonTextContainer}` }>
                    {this.props.text}
                </div>
                {this.props.isProcessingPayment ? this.renderLottieAnimation() : this.renderLockContainer()}
            </div>
        )
    }

    render () {
        return (
            <div className={this.state.isCurrentlyClicked ? `${styles.PayButton} ${styles.withBackgroundColor}` : `${styles.PayButton}`}>
                <button className={this.props.isActive ? `${styles.button} ${styles.active}` : `${styles.button}`} onMouseDown={this.onMouseClickPress} onMouseUp={this.onMouseClickRelease} onMouseLeave={this.handleOnMouseLeave} onClick={this.props.onClickHandler}>
                    {this.renderPayWithCardButton()}
                </button>
            </div>
        )
    }
    
}

export default GeneralActionButton;