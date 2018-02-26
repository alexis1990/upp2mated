import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQualitySurveyHash } from './actions';
import { authenticateSupplierWithoutCredential } from '../../scenes/Authentication/actions';

const isTokenExist = () => !!localStorage.getItem('token');
const isRefreshingPage = (isAuthenticated) => !isAuthenticated;
const redirectAfterLogin = (location) => location.pathname;

export default function restrictedNoRegisterSupplierRoutes(Component) {
  class restrictedSupplierRoutes extends React.Component {
    componentWillMount() {
      // this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      // this.checkAuth();
    }

    checkAuth() {
      const { history, getQualitySurveyHash, match, isAuthenticated, authenticateSupplierWithoutCredential } = this.props;

      console.log(match.params);

      authenticateSupplierWithoutCredential(match.params.hash);

      if (isAuthenticated) {
        console.log('JE SUIS LOGGUE BATARD !');
      }

      // const templateId = match.params.templateId;
      // const contactId = match.params.contactId;
      // const supplierId = match.params.supplierId;
      // getQualitySurveyHash(supplierId, contactId, templateId);
      // this.isAuth(isTokenExist(), history);
    }

    render() {
      const { isAuthenticated, token } = this.props;
      console.log(isAuthenticated);
      console.log(token);
      return (
        <div>
          {isAuthenticated && token !== null
            ? <Component {...this.props} />
            : 'Vous n\'êtes pas authentifié ou n\'avez pas l\'authorisation d\'être ici, sortez.'
          }
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isLogged,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({
    getQualitySurveyHash,
    authenticateSupplierWithoutCredential,
  }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(restrictedSupplierRoutes);
}
