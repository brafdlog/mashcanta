import React from 'react';
import UserSection from './UserSection';
import Modal from './Modal';
import LoginModal from './LoginModal';
import CalculatorApp from './CalculatorApp';
import HeadingSection from './HeadingSection';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { signOut, isAuthEnabled, signIn } from '../services/authService';
import styles from './Root.scss';
import { KEREN_SHAVA, SHPITZER, GOOGLE, FACEBOOK } from '../consts';

const { shape, oneOf, arrayOf, string, number, bool } = React.PropTypes;

@observer
class Root extends React.Component {

    static propTypes = {
        stateStore: shape({
            mortgages: MobxPropTypes.observableArrayOf(shape({
                id: string,
                loanAmount: number,
                monthlyPayment: number,
                totalPaymentToBank: number,
                costOfEachDollar: number,
                paymentDetailsPerMonth: arrayOf(shape({
                    principal: number,
                    interest: number,
                    total: number
                })),
                paymentDetailsPerYearMonthlyAverage: arrayOf(shape({
                    principal: number,
                    interest: number,
                    total: number
                })),
                mortgageParts: arrayOf(shape({
                    id: string,
                    order: number,
                    loanAmount: number,
                    numYears: number,
                    yearlyInterest: number,
                    amortizationType: oneOf([KEREN_SHAVA, SHPITZER])
                }))
            })),
            isLoading: bool
        })
    }

    constructor(props) {
        super(props);
        this.isSmallScreen = window.isSmallScreen;
    }

    render() {
        const { isLoading, user } = this.props.stateStore;
        if (isLoading) {
            return (
                <Modal>
                    <div className={styles.loader}></div>
                </Modal>
            );
        }
        return (
            <div className={styles.allWrapper}>
                <div className={styles.topBar}>
                    {isAuthEnabled() ?
                        <UserSection className={styles.UserSection} user={user} signOut={signOut} /> : null
                    }
                </div>
                <HeadingSection user={user} handleLoginClick={this.openLoginModal} />
                {this.state.showLoginModal ?
                    <Modal zIndex={150} positionFixed>
                        <LoginModal facebookLogin={this.facebookLogin} googleLogin={this.googleLogin} closeModal={this.closeLoginModal} />
                    </Modal> : null
                }
                <CalculatorApp stateStore={this.props.stateStore} />
            </div>
        );
    }

    state = {
        showLoginModal: false
    };

    openLoginModal = () => {
        this.setState({
            showLoginModal: true
        });
    }

    closeLoginModal = () => {
        this.setState({
            showLoginModal: false
        });
    }

    facebookLogin = () => {
        signIn(FACEBOOK);
    };

    googleLogin = () => {
        signIn(GOOGLE);
    };

}

export default Root;