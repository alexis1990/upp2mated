import React, { PureComponent } from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Image, Col, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import logo from "./imgs/logo.png";
import './styles/navbar.css';

class Header extends PureComponent {
	render(){
		return(
			<Navbar className="header" inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
					    <Image src={logo} rounded />
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
					  	<Navbar.Form pullLeft>
					        <FormGroup>
					          	<FormControl type="text" placeholder="Search" />
					        </FormGroup>
					        {' '}
					        <Button bsStyle="link">
					        	<Glyphicon glyph="search" />
					        </Button>
				      	</Navbar.Form>
				      	<NavItem eventKey={2} href="#">
				      		<Glyphicon glyph="envelope" />
				      	</NavItem>
				      	<NavItem>
				      		<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
							<NavDropdown eventKey={3} title="Bonjour PRENOM NOM" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Editer mon profil</MenuItem>
							</NavDropdown>
						</NavItem>
						<NavItem>
							<NavDropdown eventKey={3} title="Français" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Anglais</MenuItem>
							</NavDropdown>
						</NavItem>
						<NavItem eventKey={2} href="#"><Glyphicon glyph="log-out" /></NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;