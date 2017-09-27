import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../../actions'
import Spinner from '../../../../../components/Spinner'
import TeamsList from '../../Teams/components/TeamsList/'
import './styles/style.css'

class User extends Component {
	
	componentWillMount(){
		const { fetchUser, match } = this.props;
		
		fetchUser(match.params.id);
	}

	render(){

		const { user, isLoading, memberOfTeams } = this.props;
		console.log('USSS', user)
		return(
			<Row className="user">
				<Col xs={12} md={12} lg={12}>
				    { isLoading ?
				    	<Spinner />
		        	:
						<Row>
							<Col xs={6} md={6} lg={6}>
								<h3>
									Utilisateur { user.firstname } { user.lastname }
								</h3>
								<p>
									Email : { user.email }
								</p>
								<p>
									Poste : { user.jobPosition }
								</p>
							</Col>
							<Col xs={6} md={6} lg={6}>
								<TeamsList teams={ memberOfTeams } />
							</Col>
						</Row>
		        	}
				</Col>
			</Row>
		)
	}
}

function mapStateToProps(state) {
	return {
		user : state.form.Administration.user.data,
		memberOfTeams : state.form.Administration.user.data.teamList,
		isLoading : state.form.Administration.user.isLoading
	}
}

function mapDispatchToProps(state) {
	return (dispatch) => bindActionCreators({ fetchUser }, dispatch)
}

 export default connect (mapStateToProps, mapDispatchToProps) (User);