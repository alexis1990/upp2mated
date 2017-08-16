import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { loadSuppliers } from './actions'
import { bindActionCreators } from 'redux'
import { Table, ButtonGroup, Button, Glyphicon, Pagination } from 'react-bootstrap'
import Spinner from '../../components/Spinner'
import './styles/style.css'

class Suppliers extends Component {
	constructor() {
		super();
		this.state= {
			activePage: 1
		}
		this.handleSelect = this.handleSelect.bind(this);
	}
	componentDidMount(){
		const { loadSuppliers } = this.props;
		const { activePage } = this.state;
		loadSuppliers(activePage);
	}

	handleSelect(eventKey) {
		const { loadSuppliers } = this.props;
		loadSuppliers(eventKey);
		this.setState({
		    activePage: eventKey
		});
	}

	render(){
		const { suppliers } = this.props;

		return (
			<Grid fluid>
				<Row className="show-grid login-block">
					<Col xs={12} md={12} lg={12} className="new_supplier">
						 <Link to="/suppliers/supplier/new">
							 <Button type="submit" bsStyle="action-button">
								 <Glyphicon glyph="plus"/>Nouveau Fournisseur
							 </Button>
						 </Link>
					</Col>
					<Col xs={12} md={12} lg={12} className="list-supliers">
						<Table responsive>
						    <thead>
						      <tr>
						        <th>Nom fournisseur</th>
						        <th>Core business</th>
						        <th>Technologie</th>
						        <th>Evaluation</th>
						        <th>Claims</th>
						        <th>Actions</th>
						      </tr>
						    </thead>
						    <tbody>
									{ suppliers.content.map((supplier) => (
										<tr>
											<td>{ supplier.name }</td>
											<td>{ supplier.subsidiary }</td>
											<td>Table cell</td>
											<td>Table cell</td>
											<td>Table cell</td>
											<td className="actions" colSpan="2">
											<ButtonGroup justified>
												<Button className="action-button"><Link to={`/suppliers/${supplier.id}`}><Glyphicon glyph="eye-open"/></Link></Button>
												<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<2')}><Glyphicon glyph="pencil"/></Button>
												<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove"/></Button>
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
			</Grid>
		)
	}
}

function mapStateToProps(state, ownProps) {
	return{
		suppliers: state.suppliers.suppliers
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		loadSuppliers
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (Suppliers)
