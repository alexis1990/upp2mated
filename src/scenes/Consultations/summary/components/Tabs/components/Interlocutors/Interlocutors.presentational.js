import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import ListDashedBox from '../../../../../../../components/ListDashedBox/index'

const Interlocutors = props => {
	const { handleSubmit } = props
	return (
	    <ListDashedBox title="Interlocuteurs" />
  	)
}

export default Interlocutors;