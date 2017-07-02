import React, { PureComponent } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Form from './Form.presentational';
import './styles/form.css';

class FormContainer extends PureComponent {
	render(){
		return(
			<Grid className="form" fluid={true}>
				<Row className="show-grid">
					<Col xs={12} md={12} lg={12} className="consultation">
						<form>
							<Form />
					    </form>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default FormContainer;