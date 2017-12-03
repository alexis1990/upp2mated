import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Glyphicon, Table, ButtonGroup, Pagination } from 'react-bootstrap'
import { Field, reduxForm, FieldArray } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import renderInput from '../../../../components/Fields/input'
import Select from '../../../../components/Fields/select'
import { getQualitySurveys, publishQualitySurvey, editQualitySurvey } from './actions'
import './styles/style.css'

class QualitySurveys extends Component {
    componentWillMount(){
		const { getQualitySurveys } = this.props;
		this.state = {
			activePage: 1
		}
		getQualitySurveys(1);
		this.handleSelect = this.handleSelect.bind(this);
	}
	
	handleSelect(eventKey) {
		const { getQualitySurveys } = this.props;
		getQualitySurveys(eventKey);
		this.setState({
			activePage: eventKey
		});
	}

	publishQualitySurvey(survey) {
		const { publishQualitySurvey } = this.props;
		const surveyID = survey.id;
		publishQualitySurvey(surveyID)
	}

	editQualitySurvey(survey) {
		editQualitySurvey(survey);
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
										<td width="10%" className="align-center"> {survey.version}</td>
										<td width="20%" className="align-center"> {survey.publishedVersion}</td>
										<td className="actions" width="30%">
											<ButtonGroup justified>
												<Button onClick={this.editQualitySurvey.bind(this, survey)} className="action-button"><Link to={`/administration/quality-surveys/quality-survey/edit/${survey.id}/1`}><Glyphicon glyph="pencil" /></Link></Button>
												<Button className="action-button" title="Publier" onClick={this.publishQualitySurvey.bind(this, survey)}><Glyphicon glyph="screenshot" /></Button>
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
        qualitySurveys : state.form.Administration.qualitySurveys.values
    }
}

function mapDispatchToProps(state) {
    return (dispatch) => bindActionCreators({ getQualitySurveys, publishQualitySurvey, editQualitySurvey }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (QualitySurveys)