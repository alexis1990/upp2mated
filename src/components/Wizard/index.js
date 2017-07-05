import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import WizardHeader from './components/WizardHeader'
import WizardFooter from './components/WizardFooter'
import './styles/wizard.css'

// const Wizard = ({ match }) => (
//   <div>
//     { <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/1`}>
//           Rendering with React
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/2`}>
//           Components
//         </Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/3`}>
//           Props v. State
//         </Link>
//       </li>
//     </ul>

//     {/* NESTED ROUTES }
//     <Route path={`${match.url}/:stepId`} component={Steps}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// )

const Wizard = ({ match, steps }) => (
	<div>
		<WizardHeader actualStep={match.params.stepId} steps={steps} />
		{ steps[match.params.stepId - 1].component }
		{/*<WizardFooter actualStep={match.params.stepId}/>*/}
	</div>
)

function mapStateToProps(state, ownProps) {
	return {
		// pageId : ownProps.match.params.stepId
	};
}


export default withRouter(connect (mapStateToProps) (Wizard));