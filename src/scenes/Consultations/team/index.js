import React, { PureComponent } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import Title from '../../../components/Title/index';
import './styles/team.css';

class Team extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		console.log('this.props.stepsRFI', this.props.stepsRFI)
		return(
			<Col xs={12} md={12} lg={12}>
				CORSICA
			</Col>
		);
	}
}

function mapStateToProps(state) {
	return{
		stepsRFI : state.wizard.stepsRFI
	}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Team)