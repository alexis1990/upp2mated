import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { getQualitySurveyHash } from './actions'
import { connect } from 'react-redux'

const isTokenExist = () => !!localStorage.getItem('token');
export default function restrictedNoRegisterSupplierRoutes(Component) {
    class restrictedSupplierRoutes extends React.Component {
        constructor() {
            super();
            this.state = {
                isAuth: false
            }
        }

        componentWillMount() {
            const { history, getQualitySurveyHash, match} = this.props;
            const qqId = match.params.id;
            const contactId = 51;
            const supplierId = match.params.supplier;
            getQualitySurveyHash(supplierId, contactId, qqId);
            this.isAuth(isTokenExist(), history);
        }

        isAuth(isTokenExist, history) {
            if(isTokenExist) {
                this.setState({isAuth: true})
            } else {
                history.push('/')
            }
        }

        render() {
            return (
                this.state.isAuth ?
                <Component />
                :
                null
            )
        }
    }

    function mapStateToProps() {
        return {}
    }

    function mapDispatchToProps(dispatch) {
        return (dispatch, props) => bindActionCreators({ history: props.history, getQualitySurveyHash}, dispatch);
    }

    return connect (mapStateToProps, mapDispatchToProps) (restrictedSupplierRoutes);
}
