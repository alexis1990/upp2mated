import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import SummaryTabs from './components/Tabs/index'
import WizardFooter from '../../../components/Wizard/components/WizardFooter/index'
import './styles/documentation.css';

class Summary extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<div>
				<SummaryTabs />
				<WizardFooter />
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
)(Summary)