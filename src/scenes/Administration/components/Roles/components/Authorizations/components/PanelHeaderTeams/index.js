import React, { Component } from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isModalVisible } from '../../../../../../../../components/Modal/actions'

const PanelHeaderTeams = ({ isModalVisible, nameModal }) => (
	<div>
		<Col xs={4} md={4} lg={4} >
			<strong>Equipe</strong>
		</Col>
		<Col xs={4} md={4} lg={4} >
			<strong>Fonction</strong>
		</Col>
		<Col xs={3} md={3} lg={3} >
			<strong>Niveau</strong>
		</Col>
		<Col xs={1} md={1} lg={1} >
			<Button onClick={() => isModalVisible(true, nameModal)} bsStyle="action-button font-icon">
				<Glyphicon glyph="plus" />
			</Button>
		</Col>
	</div>
)

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({ isModalVisible }, dispatch)
}

export default connect(null, mapDispatchToProps)(PanelHeaderTeams);