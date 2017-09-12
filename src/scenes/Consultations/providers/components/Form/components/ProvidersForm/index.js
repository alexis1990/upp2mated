import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addProvidersField, removeProvidersField } from '../../../../actions'
import _ from 'lodash'
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

const isSupplierExisting = (contacts, index) => contacts[index].supplier && contacts[index].supplier.length > 0;

const ProvidersForm = ({ handleSubmit, fields, addProvidersField, removeProvidersField, isModalVisible, suppliers, contacts, onSearch }) => (console.log('oKOKKKOK', onSearch),
	<Col xs={12} md={12} lg={12} className="Providers">
		<h4>Fournisseurs</h4>
		<Row className="show-grid">
		    {fields.map((field, index) =>
				<Col xs={12} md={12} lg={12} key={index} className="fields">
					<Row className="show-grid">
				      	<Col sm={2} md={2} lg={4}>
					      	<Field type="select" withButton withGlyph="plus" onClick={() => isModalVisible(true)} onSearch={onSearch}   options={suppliers} placeholder="Chercher fournisseur par nom" withoutLabel name={`consultationSupplierList[${index}].supplier`} component={selectTypeahead}>Chercher fournisseur par nom</Field>
				      	</Col>
				      	{/*<Col sm={2} md={2} lg={2}>
				      		<Field type="text" placeholder="Adresse e-mail" withoutLabel name={`consultationSupplierList[${index}].mail`} component={renderInput}>Adresse e-mail</Field>
				      	</Col>*/}
				      	{console.log('okokkooo', contacts)}
						{ <Col sm={2} md={2} lg={3}>
							<Field type="select" options={ isSupplierExisting(contacts, index) ? contacts[index].supplier[0].contactPersonList : []}  placeholder="Nom de l'interlocuteur" withoutLabel name={`consultationSupplierList[${index}].interlocutor`} component={selectTypeahead}>Nom de l'interlocuteur</Field>
						</Col> }
				      	{/*<Col sm={2} md={2} lg={2}>
				      		<Field type="text" component={renderInput} withoutLabel name={`consultationSupplierList[${index}].job`} placeholder="Poste">Poste</Field>
				      	</Col>*/}
				      	<Col sm={1} md={1} lg={1}>
				      		<span>
					          <Field name={`consultationSupplierList[${index}].referenceCustomerRequested`} id='client' component="input" normalize={(v) => { return _.isBoolean(v) ? v : false; }} type="checkbox"/>
					        </span>
				      		<span>
				      			<label htmlFor="employed" className="small-text"><strong>Références clients</strong></label>
				      		</span>
				      	</Col>
				      	<Col sm={1} md={1} lg={1}>
				      		<span>
					          <Field name={`consultationSupplierList[${index}].qualitySecurityServey`} id='survey' component="input" normalize={(v) => { return _.isBoolean(v) ? v : false; }} type="checkbox"/>
					        </span>
				      		<span>
				      			<label htmlFor="employed" className="small-text"><strong>Questionnaire quali-sécurité</strong></label>
				      		</span>
				      	</Col>
				      	<Col sm={1} md={1} lg={1}>
				      		<span>
					          <Field name={`consultationSupplierList[${index}].supplierPresence`} id='presenceProvider' component="input" normalize={(v) => { return _.isBoolean(v) ? v : false; }} type="checkbox"/>
					        </span>
				      		<span>
				      			<label htmlFor="employed" className="small-text">Présence du fournisseur</label>
				      		</span>
				      	</Col>
				      	<Col sm={1} md={1} lg={2}>
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
	return {};
}

function mapDispatchToProps(dispatch, ownProps) {

	return bindActionCreators({ addProvidersField, isModalVisible, removeProvidersField }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (ProvidersForm);
