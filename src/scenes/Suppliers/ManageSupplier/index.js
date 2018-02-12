import React, { Component } from 'react'
import { Grid, Row, Col, Tab, Nav, NavItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import FormSupplier from './components/FormSupplier/index'
import FinancialHealth from './components/FinancialHealth'
import { fetchSupplier } from '../actions'
import { Link } from 'react-router-dom'
import './styles/style.css'

class ManageSupplier extends Component {
	constructor() {
		super();
		this.state = { contactPersonList: [] }
	}

	componentWillMount() {
		const { match, fetchSupplier } = this.props;
		const supplierId = match.params.id;
		if (supplierId) {
			fetchSupplier(supplierId)
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ contactPersonList: nextProps.supplier.contactPersonList });
	}

	render() {
		const { handleSubmit, supplier, match } = this.props;
		const supplierId = match.params.id;
		return (
			<Grid fluid>
				<Tab.Container id="left-tabs-example" defaultActiveKey="first">
					<Row className="clearfix">
						<Col sm={4}>
							<h3> {supplierId ? `Fournisseur ${supplier.name}` : 'Nouveau Fournisseur'}</h3>
							<Nav bsStyle="pills" stacked>
								<NavItem eventKey="first">
										Fiche du fournisseur
								</NavItem>
								<NavItem eventKey="second">
									Santé financiére
								</NavItem>
							</Nav>
						</Col>
						<Col sm={8}>
							<Tab.Content animation>
								<Tab.Pane eventKey="first">
									<FormSupplier contactPersonList={this.state.contactPersonList} />
								</Tab.Pane>
								<Tab.Pane eventKey="second">
									<FinancialHealth supplierId={ supplierId } contactPersonList={this.state.contactPersonList} />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Grid>
		)
	}
}

function mapStateToProps(state, ownProps) {
	console.log('STATTEEESUPPP', state.form.Suppliers)
	return {
		supplier: state.form.Suppliers.supplier
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchSupplier
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageSupplier)
