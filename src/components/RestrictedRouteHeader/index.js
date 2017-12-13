import React from 'react'
import { Navbar, Image } from 'react-bootstrap'
import logo from "./imgs/logo.png"

export const RestrictedRouteHeader = () => (
    <Navbar className="header" inverse collapseOnSelect fluid={true}>
        <Navbar.Header>
            <Navbar.Brand>
                <Image src={logo} rounded />
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
    </Navbar>
)