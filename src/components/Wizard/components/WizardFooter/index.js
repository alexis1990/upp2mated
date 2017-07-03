import React from 'react'
import { connect } from 'react-redux'
import { Col, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { nextPage, previousPage } from '../../../../Actions/wizard' 
import { Link } from 'react-router-dom'
import './styles/wizardfooter.css'

const WizardFooter = ({ previousPage, nextPage, actualStep }) => (
	<Col xs={12} md={8} lg={12}>
		<Link to={ (parseInt(actualStep) - 1).toString() } className="abandon">
	      Annuler
	    </Link>
		<Link to={ (parseInt(actualStep) + 1).toString() } className="nextPage">
		  Suivant
		</Link>
	</Col>
)


function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({nextPage, previousPage}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (WizardFooter);