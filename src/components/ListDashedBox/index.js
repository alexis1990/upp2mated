import React, { Component } from 'react'
import { FormGroup, FormControl, Grid, Row, Glyphicon, Col, Button } from 'react-bootstrap'
import './styles/style.css'

const ListDashedBox = ({array, title}) => {
	return (
		<Row className="show-grid box dashed-border">
			<h5>{title}</h5>
	      	<Col sm={6} md={6} lg={6}>Christophe Deschamps (c.deschamps@m-industrie.fr)</Col>
	      	<Col sm={6} md={6} lg={6}>Directeur de production</Col>
	    </Row>
  	)
}

export default ListDashedBox;
