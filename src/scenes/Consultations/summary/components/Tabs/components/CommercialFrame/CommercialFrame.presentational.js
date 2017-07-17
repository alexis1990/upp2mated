import React from 'react'
import { Col, Row, Table, Collapse } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import TableComponent from '../../../../../../../components/Table/index'

const TableHeader = [
	"Désignation",
	"Quantité/Volume",
	"Main d'œuvre",
	"Sous-traitance",
	"Garantie",
	"Personnel fournisseur",
	"Durée de vie produit",
	"Gestion des stocks",
	"Puissance machine ou produit",
	"Commentaires",
	"Coûts en energie",
	"Coûts de maintenance",
	"Prix"
]

const TableContent = [
	{},
	{}
]

const CommercialFrame = props => {
	const { handleSubmit } = props
	return (
	    <TableComponent title="Trame Commercial" TableHeader={TableHeader} TableContent={TableContent} />
  	)
}

export default CommercialFrame;