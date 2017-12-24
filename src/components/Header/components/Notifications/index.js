import React, { Component } from 'react'
import { NavDropdown, MenuItem, Badge } from 'react-bootstrap';
import { loadNotifications } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './styles/style.css'

class Notifications extends Component{
    componentWillMount() {
        const { loadNotifications } = this.props;
        const decodedPerson = JSON.parse(sessionStorage.getItem('person'));
        const userId = decodedPerson.id;
        const teamId = decodedPerson.id;
        loadNotifications(teamId, userId);
    }

    render() {
        return (
            <div className="notifications">
                <Badge><p>{1}</p></Badge>
                <NavDropdown eventKey={3} title="Notifications" id="basic-nav-dropdown">
                    {/* <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>Separated link</MenuItem> */}
                    <div>okokokok</div>
                </NavDropdown>
            </div>
        )
    }
}

function mapStateToProps(state, props){
	return{

	}
}

const mapDispatchToProps = (dispatch, props) => bindActionCreators({ loadNotifications }, dispatch);

export default connect (mapStateToProps, mapDispatchToProps) (Notifications);