import React, { Component } from 'react'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { loadSupplier } from '../../actions'
import { bindActionCreators } from 'redux'
import { Table, ButtonGroup, Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'
import Spinner from '../../../../components/Spinner'
import '../../styles/style.css'

class Supplier extends Component {
	componentDidMount(){
		const { loadSupplier, match } = this.props;
    console.log('PROPPPPPPP', this.props)
		loadSupplier(match.params.id);
	}

	render(){
		const { supplier, isLoading } = this.props;
    console.log('SUPPPPP', this.props)
		return (
			<Grid fluid>
				<Row className="show-grid login-block">
          {
            isLoading ?
            <Spinner />
            :
            <div>
              <Col xs={12} md={12} lg={6} className="list-supliers">
                <h3>Fournisseurs</h3>
                <p>Nom interlocuteur : { supplier.name }</p>
              </Col>
              <Col xs={12} md={12} lg={6} className="list-supliers">
                  <h3>Contacts :</h3>
                  <div style={{height: 500 + 'px', overflow: 'scroll'}}>
                    <ListGroup>
                      {
                        supplier.contactPersonList.map((contact) => (
                          <ListGroupItem>{contact.name} ({contact.email})</ListGroupItem>
                        ))
                      }
                    </ListGroup>
                </div>
              </Col>
            </div>
          }
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state, ownProps) {
      console.log('SUPPPPP', state)
	return{
    supplier: state.suppliers.supplier,
    isLoading: state.suppliers.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		loadSupplier
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps) (Supplier)
