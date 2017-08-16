import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import  Supplier from './components/Forms/index'
import { postSupplier } from '../../actions'
import '../../styles/style.css'

class CreateSupplier extends Component {

	submit(values) {
		const { history, postSupplier } = this.props;
    	postSupplier(values)
	}

	render(){
		const { handleSubmit } = this.props;

		return (
			<Grid fluid>
				<Row className="show-grid">
					<Col xs={12} md={6} lg={6}>
						<h2>Nouveau Fournisseur :</h2>
						<form onSubmit={handleSubmit(this.submit.bind(this))}>
              				<Supplier />
		    			</form>
					</Col>
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return{
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    	postSupplier
	}, dispatch);
}


export default reduxForm({
  	form: 'CreateSupplier'
}) (connect(mapStateToProps, mapDispatchToProps)(CreateSupplier))
