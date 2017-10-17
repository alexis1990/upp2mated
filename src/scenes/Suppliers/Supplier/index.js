import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { fetchSupplier } from '../actions'
import { bindActionCreators } from 'redux'
import ContactList from '../components/ContactList/index'
import { Table, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import Spinner from '../../../components/Spinner'
import '../styles/style.css'

class Supplier extends Component {
	componentDidMount() {
		const { fetchSupplier, match } = this.props;
		fetchSupplier(match.params.id);
	}

	render() {
		const { supplier, isLoading } = this.props;
		return (
			<Grid fluid>
				<Row className="show-grid login-block">
					{
						isLoading || typeof supplier === 'undefined' ?
							<Spinner />
							:
							<div>
								<Col xs={12} md={12} lg={6} className="list">
									<h3>Fournisseurs</h3>
									<p>Nom interlocuteur : {supplier.name}</p>
								</Col>
								<Col xs={12} md={12} lg={6} className="list">
									<ContactList suppliers={supplier.contactPersonList} />
								</Col>
							</div>
					}
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state, ownProps) {
	console.log('SUPPPPP', state)
	return {
		supplier: state.form.Suppliers.supplier,
		isLoading: state.form.Suppliers.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchSupplier
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Supplier)
