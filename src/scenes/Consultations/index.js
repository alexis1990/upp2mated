import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Wizard from '../../components/Wizard/'
import Title from '../../components/Title/'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import ProvidersModal from './providers/components/Modal/index'
import Modal from '../../components/Modal/index'

const nextStep = (history, stepId) => history.push("/consultations/" + (parseInt(stepId) + 1));

class Consultations extends Component {

	// submit(e, values) {
	// 	const { stepId, history } = this.props; 
	// 	e.preventDefault();
	// 	nextStep(history, stepId);
	// 	console.log('VVVVVV', values)
	// }

	render(){
		const { steps, isVisible } = this.props;
		return (
			<Grid className="form" fluid>
				<Modal isVisible={isVisible} component={<ProvidersModal />} />
				<Row className="show-grid">
					<Col xs={12} md={12} lg={12}>
						<Title />
						<Wizard steps={steps} />
					</Col>
				</Row>
			</Grid>
		)	
	}
}

function mapStateToProps(state, ownProps) {
	console.log('STATEEEE', state);
	return{
		stepId: ownProps.match.params.stepId,
		isVisible: state.modal
	};
}

function mapDispatchToProps() {
	return{};
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Consultations));