import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { loadSuppliers } from './actions'
import { bindActionCreators } from 'redux'
import { Table, ButtonGroup, Button, Glyphicon } from 'react-bootstrap'
import Spinner from '../../components/Spinner'
import './styles/style.css'

class Suppliers extends Component {
	componentDidMount(){
		const { loadSuppliers } = this.props;
		this.props.loadSuppliers();
	}

	render(){
		const {} = this.props;

		return (
			<Grid fluid>
				<Row className="show-grid login-block">
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
						      <tr>
						        <td>Table cell</td>
						        <td>Table cell</td>
						        <td>Table cell</td>
						        <td>Table cell</td>
						        <td>Table cell</td>
						        <td className="actions" colSpan="2">
						        	<ButtonGroup justified>
										<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<1')}><Glyphicon glyph="eye-open"/></Button>
										<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<2')}><Glyphicon glyph="pencil"/></Button>
										<Button className="action-button" onClick={()=> console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove"/></Button>
									</ButtonGroup>
						        </td>
						      </tr>
						    </tbody>
						</Table>
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
		loadSuppliers
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (Suppliers)
