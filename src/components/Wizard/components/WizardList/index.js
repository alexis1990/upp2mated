import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class WizardList extends PureComponent {
	render(){
		return(
			<Grid className="wizard">
				<Row className="show-grid">
					<Col xs={2} md={2} lg={2} className="step active">1/ Identification</Col>
					<Col xs={2} md={2} lg={2} className="step">2/ Equipe</Col>
					<Col xs={2} md={2} lg={2} className="step">3/ Fournisseurs</Col>
					<Col xs={2} md={2} lg={2} className="step">4/ Documentation</Col>
					<Col xs={2} md={2} lg={2} className="step">5/ Récapitulatif</Col>
					<Col xs={2} md={2} lg={2} className="step">6/ Confirmation</Col>
				</Row>
			</Grid>
		);
	}

}

export default WizardList;