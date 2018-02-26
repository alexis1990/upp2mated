import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { authentication } from '../../scenes/Authentication/actions'

const token = sessionStorage.getItem('token');
const isRefreshingPage = (isAuthenticated) => !isAuthenticated;
const redirectAfterLogin = (location) => location.pathname;

export default function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth();
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth();
        }

        checkAuth() {

            const { location, isAuthenticated, history, authentication } = this.props;

            if (isRefreshingPage(isAuthenticated)) {
                if(token){
                    authentication(true);
                    history.push(`${redirectAfterLogin(location)}`);
                }
                if(!token) {
                    history.push('/');
                }
            }
        }

        render() {
            const { isAuthenticated, token } = this.props;
            return (
                <div>
                    { isAuthenticated || token !== null
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = (state, props) => ({
        token: state.auth.token,
        // userName: state.auth.userName,
        isAuthenticated: state.auth.isLogged
    });

    const mapDispatchToProps = (dispatch, props) => bindActionCreators({ history: props.history, authentication }, dispatch);

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);

}