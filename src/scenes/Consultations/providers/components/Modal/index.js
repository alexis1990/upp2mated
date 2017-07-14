import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import renderInput from '../../../../../components/Fields/input'
import { isModalVisible } from '../../../../../components/Modal/actions'
import { addNewProvider } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ProvidersModal extends Component {
	constructor() {
		super();
		this.handleMyFormSubmit = this.handleMyFormSubmit.bind(this);
	}

	handleMyFormSubmit(newProvider) {
		const { addNewProvider, isModalVisible} = this.props;
		addNewProvider(newProvider.newProvider);
	    isModalVisible(false);
	}

	render(){
		const { closeModal, handleSubmit } = this.props;
		return(
			<Row className="show-grid">
				<Col sm={12} md={12} lg={12}>
					<h3>Créer un nouveau fournisseur :</h3>
				</Col>
				<form onSubmit={handleSubmit(this.handleMyFormSubmit)}>
			      	<Col sm={12} md={12} lg={12}>
			      		<Field type="text" placeholder="Nom fournisseur" label="Nom fournisseur*" name={`newProvider.name`} component={renderInput}></Field>
			      	</Col>
			      	<Col sm={12} md={12} lg={12}>
			      		<Field type="text" placeholder="Adresse e-mail" label="Adresse e-mail*" name={`newProvider.mail`} component={renderInput}></Field>
			      	</Col>
					<Col sm={12} md={12} lg={12}>
			      		<Field type="text" placeholder="Nom de l'interlocuteur" label="Nom de l'interlocuteur*" name={`newProvider.interlocutor`} component={renderInput}></Field>
			      	</Col>
			      	<Col sm={12} md={12} lg={12}>
			      		<Field type="text" placeholder="Poste" label="Poste*" name={`newProvider.job`} component={renderInput}></Field>
			      	</Col>
			      	<Col sm={12} md={12} lg={12}>
			      		<Button type="submit" onClick={() => isModalVisible(false) } className="pull-right" bsStyle="action-button">Créer</Button>
			      	</Col>
		      	</form>
		    </Row>
		)
	}
}

function mapStateToProps(state) {
	console.log('sss', state);
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ isModalVisible, addNewProvider }, dispatch)
}

ProvidersModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProvidersModal);

export default ProvidersModal = reduxForm({
  	form: 'NewProvider',
   	destroyOnUnmount: false,
})(ProvidersModal)
