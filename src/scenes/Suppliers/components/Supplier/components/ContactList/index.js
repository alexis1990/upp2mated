import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const ContactList = ({ suppliers }) => (
	<div>
        <h3>Contacts :</h3>
        <div style={{height: 500 + 'px', overflow: 'scroll'}}>
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