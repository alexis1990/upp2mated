import React from 'react';
import { Button, Glyphicon, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isModalVisible } from './actions';
import './styles/style.css';

const Modal = ({ component, isVisible, isModalVisible, nameModal, activeNameModal }) => (
	<div>
		<Grid onClick={() => isModalVisible(false, "", {})} className={`modal_background ${isVisible && nameModal == activeNameModal ? 'visible' : 'hidden'}`}>	</Grid>
		<Row className={`modal_container ${isVisible && nameModal == activeNameModal ? 'visible' : 'hidden'}`}>
			<Button className="pull-right" onClick={() => isModalVisible(false, "", {})} bsStyle="action-button-transparent small-text" type="button">
				<Glyphicon glyph="remove" />
			</Button>
			{component}
		</Row>
	</div>
);

const mapStateToProps = state => ({
  nameModal: state.modal.name,
});

const mapDispatchToProps = dispatch => bindActionCreators({ isModalVisible }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
