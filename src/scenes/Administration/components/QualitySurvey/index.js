import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon, Table, ButtonGroup, Pagination } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import renderInput from '../../../../components/Fields/input'
import Select from '../../../../components/Fields/select'
import { isModalVisible } from '../../../../components/Modal/actions'
import { getQualitySurveys, editQualitySurvey } from './actions'
import './styles/style.css'

class QualitySurveys extends Component {
    componentWillMount(){
		const { getQualitySurveys } = this.props;
		this.state = {
			activePage: 0 
		}
		getQualitySurveys(0);
		this.handleSelect = this.handleSelect.bind(this);
        this.openModalToSendQSToSupplier = this.openModalToSendQSToSupplier.bind(this);
	}
	
	handleSelect(eventKey) {
		const { getQualitySurveys } = this.props;
		getQualitySurveys(eventKey - 1);
		this.setState({
			activePage: eventKey
		});
	}

	editQualitySurvey(survey) {
		editQualitySurvey(survey);
	}

	openModalToSendQSToSupplier(survey) {
		const { sendQualitySurveyToSupplier, isModalVisible } = this.props;
		const templateId = survey.id;
		
        isModalVisible(true, null, templateId)
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, qualitySurveys } = this.props;
        return (
            <div>
                <Col lg={12}>
					<Col lg={12}>
                    	<h3>Questionnaires Qualitées :</h3>
					</Col>
					<Col lg={12} className="new-survey-action align-right">
						<Link to={`/administration/quality-surveys/quality-survey/new`}>
							<Button className="action-button" bsStyle="btn btn-action-button">
									<Glyphicon glyph="eye-plus" /> Créer un questionnaire
							</Button>
						</Link>
					</Col>
                </Col>
                <Col xs={12} md={12} lg={12} className="list-surveys list">
						<Table responsive>
							<thead>
								<tr>
									<th>Nom du questionnaire</th>
									<th>Description</th>
									<th className="align-center">Version</th>
									<th className="align-center">Version publiée</th>
									<th className="align-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{qualitySurveys.content.map((survey) => (
									<tr>
										<td width="20%">{survey.name}</td>
										<td width="20%">{survey.description}</td>
										<td width="10%" className="align-center"> {survey.editedVersion}</td>
										<td width="20%" className="align-center"> {survey.publishedVersion}</td>
										<td className="actions" width="30%">
											<ButtonGroup justified>
                                				<Button type="button" className="action-button" onClick={() => this.openModalToSendQSToSupplier(survey) }><Glyphicon glyph="send" /></Button>
												<Button onClick={this.editQualitySurvey.bind(this, survey)} className="action-button"><Link to={`/administration/quality-surveys/quality-survey/edit/${survey.id}/${survey.editedVersion}`}><Glyphicon glyph="pencil" /></Link></Button>
												<Button className="action-button" onClick={() => console.log('<<<<<<<<<<3')}><Glyphicon glyph="remove" /></Button>
											</ButtonGroup>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
						<Pagination
							bsSize="medium"
							items={qualitySurveys.totalPages}
							activePage={this.state.activePage}
							onSelect={this.handleSelect} />
					</Col>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
		isVisible: state.modal.mode,
		qualitySurveys : state.form.Administration.qualitySurveys.values
    }
}

function mapDispatchToProps(state) {
    return (dispatch) => bindActionCreators({ getQualitySurveys, editQualitySurvey, isModalVisible }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (QualitySurveys)