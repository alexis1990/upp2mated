import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { fetchSuppliers } from './actions'
import { bindActionCreators } from 'redux'
import { Table, ButtonGroup, Button, Glyphicon, Pagination } from 'react-bootstrap'
import Spinner from '../../components/Spinner'
import './styles/style.css'

class Suppliers extends Component {
	constructor() {
		super();
		this.state = {
			activePage: 1
		}
		this.handleSelect = this.handleSelect.bind(this);
	}
	componentDidMount() {
		const { fetchSuppliers } = this.props;
		const { activePage } = this.state;
		fetchSuppliers(activePage);
	}

	handleSelect(eventKey) {
		const { fetchSuppliers } = this.props;
		fetchSuppliers(eventKey);
		this.setState({
			activePage: eventKey
		});
	}

	render() {
		const { suppliers } = this.props;

		return (
			<Grid fluid>
				<Row className="show-grid login-block">
					<Col xs={12} md={12} lg={12} className="new_supplier">
						<Link to="/suppliers/supplier/new">
							<Button type="submit" bsStyle="action-button">
								<Glyphicon glyph="plus" />Nouveau Fournisseur
							 </Button>
						</Link>
					</Col>
					<Col xs={12} md={12} lg={12} className="list-supliers list">
						<Table responsive>
							<thead>
								<tr>
									<th>Nom fournisseur</th>
									<th>Core business</th>
									<th>Technologie</th>
									<th>Evaluation</th>
									<th>Claims</th>
									<th className="align-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{suppliers.content.map((supplier) => (
									<tr>
										<td width="20%">{supplier.name}</td>
										<td width="20%">{supplier.subsidiary}</td>
										<td width="10%"> Table cell</td>
										<td width="10%">Table cell</td>
										<td width="20%">Table cell</td>
										<td className="actions" width="20%">
											<ButtonGroup justified>
												<Button className="action-button"><Link to={`/suppliers/${supplier.id}`}><Glyphicon glyph="eye-open" /></Link></Button>
												<Button className="action-button"><Link to={`/suppliers/supplier/edit/${supplier.id}`}><Glyphicon glyph="pencil" /></Link></Button>
												<Button className="action-button" onClick={() => console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove" /></Button>
											</ButtonGroup>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Pagination
							bsSize="medium"
							items={suppliers.totalPages}
							activePage={this.state.activePage}
							onSelect={this.handleSelect} />
					</Col>
				</Row>
			</Grid >
		)
	}
}

function mapStateToProps(state, ownProps) {
	return {
		suppliers: state.form.Suppliers.suppliers
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchSuppliers
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Suppliers)
