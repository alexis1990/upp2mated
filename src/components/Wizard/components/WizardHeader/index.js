import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WizardHeader = ({steps, actualStep}) => (
	<Grid className="wizard">
		<Row className="show-grid">
			{steps.map((step, index)=> (
				<Col xs={12/steps.length} md={12/steps.length} lg={12/steps.length} className={"step " + (parseInt(actualStep) >= step.id ? 'active' : '')}> {index + 1}/ {step.title}</Col>
			))}
			
			{/*<Col xs={2} md={2} lg={2} className="step">2/ Equipe</Col>
			<Col xs={2} md={2} lg={2} className="step">3/ Fournisseurs</Col>
			<Col xs={2} md={2} lg={2} className="step">4/ Documentation</Col>
			<Col xs={2} md={2} lg={2} className="step">5/ Récapitulatif</Col>
			<Col xs={2} md={2} lg={2} className="step">6/ Confirmation</Col>*/}
		</Row>
	</Grid>
)

export default WizardHeader;