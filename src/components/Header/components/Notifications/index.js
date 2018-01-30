import React, { Component } from 'react'
import { NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { fetchNotifications } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'
class Notifications extends Component{
    componentDidMount() {
        const { fetchNotifications } = this.props;
        const decodedPerson = JSON.parse(sessionStorage.getItem('person'));
        const userId = decodedPerson.id;
        const teamId = JSON.parse(sessionStorage.getItem('teamId'));
        
        this.myInterval = setInterval(function(){ 
            fetchNotifications(teamId, userId); 
        }, 5000);        
        
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    render() {
        const { notificationsCount, notifications } = this.props;
        return (
            <div className="notifications">
                <Badge><p>{notificationsCount}</p></Badge>
                <NavDropdown eventKey={3} title="Notifications" id="basic-nav-dropdown">
                    {
                        notifications.map((notification)=> 
                            <li>
                                {notification.subject} - {notification.description}
                            </li>
                        )
                    }
                </NavDropdown>
            </div>
        )
    }
}

function mapStateToProps(state, props){
	return{
        notifications : state.notifications.list,
        notificationsCount : state.notifications.count
	}
}

const mapDispatchToProps = (dispatch, props) => bindActionCreators({ fetchNotifications }, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (Notifications);