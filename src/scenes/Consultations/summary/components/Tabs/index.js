import React, { PureComponent } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import { Tabs, Tab, Row } from 'react-bootstrap';
import Interlocutors from './components/Interlocutors/Interlocutors.presentational'
import CommercialFrame from './components/CommercialFrame/CommercialFrame.presentational'
import './styles/style.css'

class SummaryTabs extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		return(
	        <Tabs defaultActiveKey={1} animation={false} id="summary-tabs">
				<Tab eventKey={1} title="Version Fournisseurs">
					<h3>Consultation commerciale #234567 :</h3>
					<p>Date de clôture : </p>
					<Interlocutors />
					<CommercialFrame />
				</Tab>
				<Tab eventKey={2} title="Version Acheteurs">
					<h3>Consultation commerciale #234567 :</h3>
					<p>Date de clôture : </p>
				</Tab>
			</Tabs>
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
)(SummaryTabs)