import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Wizard from '../../components/Wizard/'
import Title from '../../components/Title/'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

const nextStep = (history, stepId) => history.push("/consultations/" + (parseInt(stepId) + 1));

class Consultations extends Component {

	// submit(e, values) {
	// 	const { stepId, history } = this.props; 
	// 	e.preventDefault();
	// 	nextStep(history, stepId);
	// 	console.log('VVVVVV', values)
	// }

	render(){
		const { steps } = this.props;
		return (
			<Grid className="form" fluid={true}>
				<Row className="show-grid">
					<Col xs={12} md={12} lg={12} className="consultation">
						<Title />
						<Wizard steps={steps} />
					</Col>
				</Row>
			</Grid>
		)	
	}
}

function mapStateToProps(state, ownProps) {
	// console.log('STATEEEE', state, ownProps.match);
	return{
		stepId: ownProps.match.params.stepId
	};
}

function mapDispatchToProps() {
	return{};
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Consultations));