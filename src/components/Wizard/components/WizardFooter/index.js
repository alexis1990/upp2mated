import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Col, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { nextPage, previousPage } from '../../actions'
import { Link } from 'react-router-dom'
import './styles/wizardfooter.css'

function next(event, { history, stepId }) {
  // history.push((parseInt(stepId) + 1).toString());
  // nextPage(2)
}

function previous(event, { history, stepId }) {
  event.preventDefault();
  history.push((parseInt(stepId) - 1).toString());
}

const WizardFooter = ({ actualStep, history, stepId }) => (
	<Col xs={12} md={12} lg={12} className="wizardFooter">
		<Button onClick={(e) => previous(e, {history:history, stepId:stepId})} className="abandon">
	      Annuler
	    </Button>
		{/* <Button onClick={ (e) => next(e, {history:history, stepId:stepId}) } type="submit" className="next"> */}
    <Button type="submit" className="next">
			Suivant
		</Button>
	</Col>
)


function mapStateToProps(state, ownProps) {
	return {
		stepId : ownProps.match.params.stepId
	};
}

function mapDispatchToProps(dispatch, ownProps) {

	return bindActionCreators({nextPage}, dispatch);
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps) (WizardFooter));
