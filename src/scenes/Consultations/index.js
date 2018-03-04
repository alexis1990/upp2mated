import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Wizard from '../../components/Wizard/'
import Title from '../../components/Title/'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import ProvidersModal from './providers/components/Modal/index'
import CategoriesModal from './commercialFrame/components/CategoriesModal'
import SubCategoriesModal from './commercialFrame/components/SubCategoriesModal'
import DesignationModal from './commercialFrame/components/DesignationModal'
import Modal from '../../components/Modal/index'
import Spinner from '../../components/Spinner'

// const nextStep = (history, stepId) => history.push("/consultations/" + (parseInt(stepId) + 1));

class Consultations extends Component {

	// submit(e, values) {
	// 	const { stepId, history } = this.props;
	// 	e.preventDefault();
	// 	nextStep(history, stepId);
	// 	console.log('VVVVVV', values)
	// }

	render(){
		const { steps, isVisible, isAuthenticated } = this.props;
		return (
			<Grid className="form" fluid>
				<Modal isVisible={isVisible} activeNameModal='providers'  component={<ProvidersModal />} />
				<Modal isVisible={isVisible} activeNameModal='categories' component={<CategoriesModal/>} />
				<Modal isVisible={isVisible} activeNameModal='sub-categories'  component={<SubCategoriesModal />} />
				<Modal isVisible={isVisible} activeNameModal='designations' component={<DesignationModal/>} />
				{
					isAuthenticated
					?
					<Row className="show-grid">
						<Col xs={12} md={12} lg={12}>
							<Title />
							<Wizard {...this.props} />
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
	console.log('STATEEEE', state);
	return{
		stepId: ownProps.match.params.stepId,
		isVisible: state.modal.mode,
		isAuthenticated: state.auth.isLogged
	};
}

function mapDispatchToProps() {
	return{};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Consultations))
