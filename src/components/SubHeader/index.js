import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Glyphicon } from 'react-bootstrap';
import './styles/subheader.css';

class SubHeader extends PureComponent {
	render(){
		return(
			<Navbar className="subheader" inverse collapseOnSelect fluid={true}>
				<Navbar.Collapse>
					<Nav pullLeft>
				      	<NavItem eventKey={1}><Glyphicon glyph="dashboard" />
						  <Link to="/dashboard">Dashboard</Link>
						</NavItem>
				      	<NavItem eventKey={1}>
					      	<Glyphicon glyph="dashboard" />
					      	<Link to="/suppliers">Fournisseurs</Link>
				      	</NavItem>
					  	{/*<NavItem>
							<NavDropdown eventKey={3} title={<span><Glyphicon glyph="file"/><span>fournisseurs</span></span>} id="basic-nav-dropdown">
								<MenuItem containerElement={} eventKey={3.1}>Anglais</MenuItem>
							</NavDropdown>
						</NavItem>*/}
						<NavItem eventKey={1}>
							<Glyphicon glyph="file" />
							<Link to="/consultations">Consultations</Link>
						</NavItem>
						<NavItem eventKey={1}><Glyphicon glyph="list-alt" />Devis</NavItem>
						<NavItem eventKey={1}><Glyphicon glyph="usd" />Spent</NavItem>
						<NavItem>
							<NavDropdown eventKey={3} title={<span><Glyphicon glyph="list"/><span>Contrats</span></span>} id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Anglais</MenuItem>
							</NavDropdown>
						</NavItem>
						<NavItem>
							<NavDropdown eventKey={4} title={<span><Glyphicon glyph="cog"/><span>Paramétres</span></span>} id="basic-nav-dropdown">
								<MenuItem>
									<Glyphicon glyph="cog" />
									<Link to='/administration'>Administration</Link>
								</MenuItem>
							</NavDropdown>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default SubHeader;