import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProvidersField, removeProvidersField, loadContacts } from '../../../../actions'
import { 
	FormGroup, 
	FormControl, 
	HelpBlock, 
	ControlLabel, 
	Radio, 
	Checkbox, 
	Button, 
	Col, 
	Row,
	InputGroup,
	Glyphicon
} from 'react-bootstrap'
import renderInput from '../../../../../../../components/Fields/input'
import Select from '../../../../../../../components/Fields/select'
import selectTypeahead from '../../../../../../../components/Fields/selectTypeahead'
import RangeTimePicker from '../../../../../../../components/RangeTimePicker/index'
import SingleTimePicker from '../../../../../../../components/SingleTimePicker/index'
import { isModalVisible } from '../../../../../../../components/Modal/actions'
import { Field, reduxForm } from 'redux-form'
import './styles/style.css'
const { DOM: { input } } = React

function openModal(e) {
	console.log('EEE', e)
}

const ProvidersForm = ({ handleSubmit, fields, listProviders, addProvidersField, removeProvidersField, isModalVisible, suppliers, loadContacts}) => (console.log('FIEEEEE', fields),
	<Col xs={12} md={12} lg={12} className="Providers">
		<h4>Fournisseurs</h4>
		<Row className="show-grid">
		    {fields.map((field, index) =>
				<Col xs={12} md={12} lg={12} key={index} className="fields">
					<Row className="show-grid">
				      	<Col sm={2} md={2} lg={3}>
					      	<Field type="select" withButton withGlyph="plus" onClick={() => isModalVisible(true)} onChange={(values) => loadContacts(values)} options={suppliers} placeholder="Chercher fournisseur par nom" withoutLabel name={`providersReducer[${index}].provider`} component={selectTypeahead}>Chercher fournisseur par nom</Field>
				      	</Col>
				      	{/*<Col sm={2} md={2} lg={2}>
				      		<Field type="text" placeholder="Adresse e-mail" withoutLabel name={`providersReducer[${index}].mail`} component={renderInput}>Adresse e-mail</Field>
				      	</Col>*/}
				      	<Col sm={2} md={2} lg={2}>
				      		<Field type="text" placeholder="Nom de l'interlocuteur" withoutLabel name={`providersReducer[${index}].interlocutor`} component={renderInput}>Nom de l'interlocuteur</Field>
				      	</Col>
				      	{/*<Col sm={2} md={2} lg={2}>
				      		<Field type="text" component={renderInput} withoutLabel name={`providersReducer[${index}].job`} placeholder="Poste">Poste</Field>
				      	</Col>*/}
				      	<Col sm={1} md={1} lg={2}>
				      		<span>
					          <Field name={`providersReducer[${index}].client`} id='client' component="input" type="checkbox"/>
					        </span>
				      		<span>
				      			<label htmlFor="employed" className="small-text"><strong>Références clients</strong></label>
				      		</span>
				      	</Col>
				      	<Col sm={1} md={1} lg={2}>
				      		<span>
					          <Field name={`providersReducer[${index}].survey`} id='survey' component="input" type="checkbox"/>
					        </span>
				      		<span>
				      			<label htmlFor="employed" className="small-text"><strong>Questionnaire quali-sécurité</strong></label>
				      		</span>
				      	</Col>
				      	<Col sm={1} md={1} lg={2}>
				      		<span>
					          <Field name={`providersReducer[${index}].presenceProvider`} id='presenceProvider' component="input" type="checkbox"/>
					        </span>
				      		<span>
				      			<label htmlFor="employed" className="small-text">Présence du fournisseur</label>
				      		</span>
				      	</Col>
				      	<Col sm={1} md={1} lg={1}>
				      		<Button type="button" bsStyle="action-button font-icon" onClick={() => removeProvidersField(index)}><Glyphicon glyph="minus"/></Button>
				      	</Col>
				    </Row>
				</Col>
		    )}
		    <Col xs={12} md={8} lg={12}>
		      <Button type="button" bsStyle="action-button font-icon" onClick={() => addProvidersField()}><Glyphicon glyph="plus"/></Button>
		    </Col>
		</Row>
		</Col>
	)

function mapStateToProps(state) {
	return {
		listProviders: state.form.Providers.values.listProviders,
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	
	return bindActionCreators({ addProvidersField, isModalVisible, removeProvidersField, loadContacts }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (ProvidersForm);