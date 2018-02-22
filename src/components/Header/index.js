import React, {PureComponent} from 'react';
import {Navbar, NavItem, NavDropdown, MenuItem, Nav, Image, Col, FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';
import Notifications from './components/Notifications/'
import logo from "./imgs/logo.png";
import {withRouter} from 'react-router-dom'
import {logout} from './actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import './styles/navbar.css'

class Header extends PureComponent {
  constructor(props) {
    super(props);
  }

  logout() {
    const {history} = this.props;
    this.props.logout(history, sessionStorage);
  }

  render() {
    const person = JSON.parse(sessionStorage.getItem('person'))
    const firstName = person.firstname
    const name = person.name

    return (
      <Navbar className="header" inverse collapseOnSelect fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Image src={logo} rounded/>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text"/>
              </FormGroup>
              {' '}
              <Button bsStyle="link">
                <Glyphicon glyph="search"/>
              </Button>
            </Navbar.Form>
            <NavItem eventKey={2}>
              <Notifications/>
            </NavItem>
            <NavItem>
              <NavDropdown eventKey={3} title={<span><Glyphicon glyph="user"/><span className="user">Bonjour {firstName} {name}</span></span>} id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Editer mon profil</MenuItem>
              </NavDropdown>
            </NavItem>
            <NavItem>
              <NavDropdown eventKey={3} title="Français" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Anglais</MenuItem>
              </NavDropdown>
            </NavItem>
            <NavItem eventKey={2} onClick={this.logout.bind(this)}><Glyphicon glyph="log-out"/></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state, props) {
  return {}
}

const mapDispatchToProps = (dispatch, props) => bindActionCreators({logout}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));