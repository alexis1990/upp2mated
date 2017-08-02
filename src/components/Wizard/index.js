import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { nextPage } from './actions'
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
class Wizard extends Component {
  constructor(props) {
    super(props)
		console.log('PROPPPP', props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage(e) {
		const { match, history } = this.props
		// this.props.nextPage(match.params.stepId);
		history.push((parseInt(match.params.stepId) + 1).toString());
    // this.setState({page: this.state.page + 1})
  }

  previousPage() {
    this.setState({page: this.state.page - 1})
  }

  render() {
    const {onSubmit, steps, match, stepId} = this.props
		console.log('STEPIDDD', stepId)
    const {page} = this.state
    return (
      <div>
        {/* {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />}
        {page === 3 &&
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />} */}
					<WizardHeader actualStep={match.params.stepId} steps={steps} />
					{React.cloneElement(
				   	steps[stepId - 1].component,
				    { onSubmit: this.nextPage },
						{ previousPage: this.previousPage }
					)}
					{/* { steps[match.params.stepId - 1].component } */}
      </div>
    )
  }
}

// const Wizard = ({ match, steps }) => (
// 	<div>
// 		<WizardHeader actualStep={match.params.stepId} steps={steps} />
// 		{ steps[match.params.stepId - 1].component }
// 		{/*<WizardFooter actualStep={match.params.stepId}/>*/}
// 	</div>
// )

function mapStateToProps(state, ownProps) {
	console.log('STATTTEE', state)
	return {
		actualStep: state.wizard.actualStep
		// pageId : ownProps.match.params.stepId
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ nextPage }, dispatch);
}


export default withRouter(connect (mapStateToProps, mapDispatchToProps) (Wizard));
