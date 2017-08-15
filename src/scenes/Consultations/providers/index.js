import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FormContainer from './components/Form/index';
import './styles/providers.css'

class Providers extends PureComponent {
	constructor(props){
		super(props);
	}

	submit(values) {
		console.log('SUBMITTTT', values)
	}

	render(){
		const { previousPage } = this.props;
		return(
			<div>
				<FormContainer onSubmit={this.submit.bind(this)} previousPage={previousPage} />
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
