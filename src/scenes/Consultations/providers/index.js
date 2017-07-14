import React, { PureComponent } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap';
import FormContainer from './components/Form/index';
import './styles/providers.css'

class Providers extends PureComponent {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<FormContainer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return{}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Providers)