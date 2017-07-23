import React, { PureComponent } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import WizardFooter from '../../../components/Wizard/components/WizardFooter/index'
import './styles/style.css'
const { DOM: { input } } = React

const array = [
	{ 
		name: 'Nom fournisseur 1', 
		mail:'mail@siteweb.ext',
		files: [
			{
				name: 'Nom-fichier.doc',
			},
			{
				name: 'Nom-fichier.pdf',
			},
			{
				name: 'Nom-fichier.pdf',
			}
		]
	},
	{ 
		name: 'Nom fournisseur 1', 
		mail:'mail@siteweb.ext',
		files: [
			{
				name: 'Nom-fichier.doc',
			},
			{
				name: 'Nom-fichier.pdf',
			},
			{
				name: 'Nom-fichier.pdf',
			}
		]
	}
]

class Confirmation extends PureComponent {
	constructor(props){
		super(props)
	}

	render(){
		return(
			<Row className="show-grid">
				<Col lg={12}>
					<h4>Les fournisseurs suivants recevront votre demande :</h4>
				</Col>
				<Col lg={12} className="list">
				{
					array.map((element)=>
						<Col lg={12} className="element">
							<Col lg={2}>{element.name}</Col>
							<Col lg={2}>{element.mail}</Col>
							<Col lg={6} className="files">
								<ul>
									{element.files.map((file)=><li>{file.name}</li>)}
								</ul>
							</Col>
							<Col className="actions" lg={2}>
								<Glyphicon glyph="edit" />
								<Glyphicon glyph="paperclip" />
								<Glyphicon glyph="remove" />
							</Col>
						</Col>
					)
				}
				</Col>
				<WizardFooter />
			</Row>
		);
	}
}

function mapStateToProps(state) {
	return{}
}

function mapDispatchToProps() {
	return (dispatch) => bindActionCreators({}, dispatch);
}

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Confirmation);