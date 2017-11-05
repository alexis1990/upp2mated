import React, { Component } from 'react'
import { Col, Button, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isModalVisible } from '../../../../../../../../components/Modal/actions'

const PanelHeaderUsers = ({ isModalVisible, nameModal }) => (
	<div>
		<Col xs={11} md={11} lg={11} >
			<strong>Utilisateurs</strong>
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

export default connect(null, mapDispatchToProps)(PanelHeaderUsers);