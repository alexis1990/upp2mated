import React, { PureComponent } from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import ReactDataSheet from 'react-datasheet';
import WizardFooter from '../../../components/Wizard/components/WizardFooter/index'
import './styles/style.css'
const { DOM: { input } } = React

class CommercialFrame extends PureComponent {
	constructor(props){
		super(props)
		this.state = {
	      grid: [
	        [
	          {readOnly: true, value: ''}, 
	          {value: 'A', readOnly: true}, 
	          {value: 'B', readOnly: true}, 
	          {value: 'C', readOnly: true}, 
	          {value: 'D', readOnly: true}
	        ],
	        [{readOnly: true, value: 1}, {value: 1}, {value: 3}, {value: 3}, {value: 3}],
	        [{readOnly: true, value: 2}, {value: 2}, {value: 4}, {value: 4}, {value: 4}],
	        [{readOnly: true, value: 3}, {value: 1}, {value: 3}, {value: 3}, {value: 3}],
	        [{readOnly: true, value: 4}, {value: 2}, {value: 4}, {value: 4}, {value: 4}]
	      ]
	    }
	}

	render(){
		return(
			<Row className="show-grid">
				<Col lg={12}>
					<ReactDataSheet
						className="table"
				        data={this.state.grid}
				        valueRenderer={(cell) => cell.value}
				        onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
				        onChange={(modifiedCell, colI, rowJ, value) =>
				          this.setState({
				            grid: this.state.grid.map((row) =>
				              row.map((cell) =>
				                (cell === modifiedCell) ? ({value: value}) : cell
				              )
				            )
				          })
				        }
				      />
				    <WizardFooter />
				</Col>
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
)(CommercialFrame);