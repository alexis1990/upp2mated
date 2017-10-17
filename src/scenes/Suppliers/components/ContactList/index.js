import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const ContactList = ({ suppliers }) => (
	<div>
		<h4>Contacts :</h4>
		<div style={{ height: 200 + 'px', overflow: 'scroll' }}>
			<ListGroup>
				{
					suppliers.map((contact, index) => (
						<ListGroupItem key={index}>{contact.name} ({contact.email})</ListGroupItem>
					))
				}
			</ListGroup>
		</div>
	</div>
)

export default ContactList;