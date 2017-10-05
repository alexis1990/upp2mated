import React, { Component } from 'react'
import { FormGroup, FormControl, Grid, Row, Glyphicon, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { isModalVisible } from './actions'
import { bindActionCreators } from 'redux'
import './styles/style.css'

const Modal = ({ component, isVisible, isModalVisible, nameModal, activeNameModal}) => (console.log('NAMMMME', nameModal, activeNameModal),
	<Grid className={`modal_background ${isVisible && nameModal == activeNameModal ? 'visible' : 'hidden'}`}>
		<Row className={`modal_container ${isVisible && nameModal == activeNameModal ? 'visible' : 'hidden'}`}>
			<Button className="pull-right" onClick={() => isModalVisible(false)} bsStyle="action-button-transparent small-text" type="button">
				<Glyphicon glyph="remove"/>
			</Button>
			{ component }
		</Row>
	</Grid>
);

function mapStateToProps(state) {
	console.log('STATEEEMODALL', state)
	return {
		nameModal: state.modal.name
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators( {isModalVisible}, dispatch)
}


export default connect (mapStateToProps, mapDispatchToProps) (Modal);
