import React, { Component } from 'react'
import { Row, Col, Glyphicon, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UsersList from './components/UsersList/'

class Users extends Component {
	render(){
		return(
			<Row className="team">
				<Col xs={12} md={12} lg={12}>
					<Col xs={9} md={9} lg={9}>
						<h3>
							Utilisateurs
						</h3>
					</Col>
					<Col xs={3} md={3} lg={3}>
						<Button>
							<Link to={`/administration/users/user/new`}>
								<Glyphicon glyph="plus"/>Ajouter un utilisateur
							</Link>
						</Button>
					</Col>
					<Col xs={12} md={12} lg={12}>
						<UsersList actions />
					</Col>
				</Col>
			</Row>
		)
	}
}

 export default Users;