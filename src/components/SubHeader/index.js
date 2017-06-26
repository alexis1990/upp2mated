import React, { PureComponent } from 'react';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Image, Col, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import './styles/subheader.css';

class SubHeader extends PureComponent {
	render(){
		return(
			<Navbar className="subheader" inverse collapseOnSelect>
				<Navbar.Collapse>
					<Nav pullLeft>
				      	<NavItem eventKey={1} href="#"><Glyphicon glyph="dashboard" />dashboard</NavItem>
					  	<NavItem>
							<NavDropdown eventKey={3} title={<Glyphicon glyph="paper" />} id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Anglais</MenuItem>
							</NavDropdown>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default SubHeader;