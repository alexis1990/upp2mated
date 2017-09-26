import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import UsersList from './components/UsersList/'

class Users extends Component {
	render(){
		return(
			<Row className="team">
				<Col xs={12} md={12} lg={12}>
					<h3>
		            	Utilisateurs
		        	</h3>
					<UsersList actions />
				</Col>
			</Row>
		)
	}
}

 export default Users;