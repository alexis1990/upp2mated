import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { bindActionCreators, compose } from 'redux';
import { authenticate } from './actions';
import Spinner from '../../components/Spinner';
import logo from './styles/imgs/logo.png';
import LoginForm from './components/Login/index';
import './styles/style.css';

class Authentication extends Component {

  submit(values) {
    const { history } = this.props;
    this.props.authenticate(values, history);
  }

  render() {
    const { steps, isVisible, handleSubmit, isAuthenticated } = this.props;

    return (
      <Grid fluid style={{ height: window.innerHeight }} className="img_background">
        {isAuthenticated == null ?
          <Row className="show-grid login-block">
            <Col xs={12} md={6} lg={6} className="logo-box">
              <Image src={logo} rounded />
            </Col>
            <Col xs={12} md={5} lg={5} className="login-box">
              <h1>Connexion :</h1>
              <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <LoginForm />
              </form>
            </Col>
          </Row>
          :
          <Spinner />
        }
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isLogged,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  authenticate,
}, dispatch);

export default compose(
  reduxForm({
    form: 'Authentication',
  }),
  connect(mapStateToProps, mapDispatchToProps, null, {
    pure: false,
  }),
)(Authentication);
