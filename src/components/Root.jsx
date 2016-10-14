import React from 'react';
import UserSection from './UserSection';
import Modal from './Modal';
import LoginModal from './LoginModal';
import HeadingSection from './HeadingSection';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { signOut, isAuthEnabled, signIn } from '../services/authService';
import styles from './Root.scss';
import { KEREN_SHAVA, SHPITZER, GOOGLE, FACEBOOK, BULLET } from '../consts';

// Loaders are specified explicitly because we don't want css modules to run during the loading of these files
import '!style!css!bootstrap/dist/css/bootstrap.css';
import '!style!css!bootstrap-rtl/dist/css/bootstrap-rtl.css';

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
                    amortizationType: oneOf([KEREN_SHAVA, SHPITZER, BULLET])
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
        return (
            <div className={styles.allWrapper}>
                <div className={styles.topBar}>
                    {isAuthEnabled() ?
                        <UserSection className={styles.UserSection} user={user} signOut={signOut} /> : null
                    }
                </div>
                <HeadingSection showLoginButton={!user && !isLoading} handleLoginClick={this.openLoginModal} />
                {this.state.showLoginModal ?
                    <Modal zIndex={150} positionFixed>
                        <LoginModal facebookLogin={this.facebookLogin} googleLogin={this.googleLogin} closeModal={this.closeLoginModal} />
                    </Modal> : null
                }
                {this.state.loadingComponent || isLoading ?
                    <Modal>
                        <div className='loader'></div>
                    </Modal> :
                    <this.CalculatorApp stateStore={this.props.stateStore} />
                }
            </div>
        );
    }

    componentWillMount() {
        this.setState({
            loadingComponent: true
        });
        require.ensure([], require => {
            this.CalculatorApp = require('./CalculatorApp').default;
            this.setState({
                loadingComponent: false
            });
        }, 'CalculatorApp');
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