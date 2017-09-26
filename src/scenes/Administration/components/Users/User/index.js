import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import './styles/style.css'

class User extends Component {
	
	componentWillMount(){
		const { fetchUser, match } = this.props;
		
		fetchUser(match.params.id);
	}

	render(){

		const { user, isLoading } = this.props;
		console.log('USSS', user)
		return(
			<Row className="user">
				<Col xs={12} md={12} lg={12}>
				    { isLoading ?
				    	<Spinner />
		        	:
						<h3>
			            	Utilisateur { user.firstname } { user.lastname }
			        	</h3>
		        	}
				</Col>
			</Row>
		)
	}
}

function mapStateToProps(state) {
	return {
		user : state.form.Administration.user.data,
		isLoading : state.form.Administration.user.isLoading
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({ fetchUser }, dispatch)
}

 export default connect (mapStateToProps, mapDispatchToProps) (User);