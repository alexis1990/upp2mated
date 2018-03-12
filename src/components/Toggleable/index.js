import React, { Component } from 'react'
import { Col, Glyphicon } from 'react-bootstrap'
import './styles/style.css'

class ToggleableComponent extends Component {
    constructor() {
        super();
        this.state = {
            hide: false
        }
    }

    toggle(){
        this.setState({hide: !this.state.hide});
    }

    render() {
      return (
        <Col xs={12} md={12}>  
            <Col className="toggle-button"  onClick={this.toggle.bind(this)}>
                <Glyphicon glyph={`menu-${this.state.hide ? 'up' : 'down'}`}/>
            </Col>
            <Col xs={12} md={12} className={this.state.hide ? 'hidden' : 'show'}>
                {this.props.children}
            </Col>
        </Col>
      );
    }
};

export default ToggleableComponent;