import React, { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import renderInput from '../../components/Fields/input'
import { authenticate } from './actions'
import { bindActionCreators } from 'redux'
import Spinner from '../../components/Spinner'

class Authentication extends Component {

	submit(values) {
		const { history } = this.props;
		console.log('THIS.PROP¨S', this.props)
		this.props.authenticate(values, history);
	}

	render(){
		const { steps, isVisible, handleSubmit, isAuthenticated } = this.props;
		
		return (
			<Grid fluid>
			{	isAuthenticated == null ?
				<Row className="show-grid">
					<Col xs={12} md={6} lg={6}>
					okokokok
					</Col>
					<Col xs={12} md={6} lg={6}>
						<form onSubmit={handleSubmit(this.submit.bind(this))}>
							<Field type="text" name="name" placeholder="Nom"  component={renderInput}>Nom :</Field>
		    				<Field type="password" name="password" placeholder="Mot de passe"  component={renderInput}>Mot de Passe :</Field>
		    				<Button type="submit">Enregistrez-vous</Button>
		    			</form>
					</Col>
				</Row>
				: 
				<Spinner />
			}
			</Grid>
		)	
	}
}

function mapStateToProps(state, ownProps) {
	return{
		isAuthenticated: state.auth.isLogged
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		authenticate
	}, dispatch);
}


export default withRouter(reduxForm({
  	form: 'Authentication'
}) (connect(mapStateToProps, mapDispatchToProps)(Authentication)))