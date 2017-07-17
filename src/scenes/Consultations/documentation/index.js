import React, { PureComponent } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import renderDropzoneInput from '../../../components/Fields/renderDropzoneInput'
import WizardFooter from '../../../components/Wizard/components/WizardFooter/index'
import './styles/documentation.css'
const { DOM: { input } } = React

class Documentation extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<Col>
				<Field
					name="file"
					component={renderDropzoneInput}
					label={ "Joindre un/des fichiers "}
					glyphName="file"
					/>
				<WizardFooter />
			</Col>
		);
	}
}

function mapStateToProps(state) {
	return{}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}

Documentation = connect(
    mapStateToProps,
    // mapDispatchToProps
)(Documentation);

export default Documentation = reduxForm({
  	form: 'Identification',
   	destroyOnUnmount: false
})(Documentation);