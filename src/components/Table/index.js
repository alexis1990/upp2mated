import React, { Component } from 'react'
import { withRouter, Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Table, Collapse, Col, Glyphicon } from 'react-bootstrap'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './styles/style.css'
	{/*<Table responsive className="dashed-border">
		<h5>{title}</h5>
		<thead>
		  	<tr>
				{ TableHeader.map((col) => <th title={col} >{col}</th>)}
			</tr>
		</thead>
		<tbody>
			{ TableContent.map((col) => 
				<tr>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
					<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    		<td>1</td>
		    	</tr>
		    )}
		</tbody>
	</Table>*/}
	{/*<table>
				<thead>
				    <tr>
				        <th>Job Name</th>
				        <th>Description</th>
				        <th>Provider Name</th>
				        <th>Region</th>
				        <th>Status</th>
				    </tr>
				</thead>
				<tbody>
				    <tr onClick={this.toggle}>
				        <td>OBS Name</td>
				        <td>OBS Description</td>
				        <td>hpcloud</td>
				        <td>nova</td>
				        <td> created</td>
				    </tr>
				   		<tr colspan="12">
					        <td colspan="12">
					            <div classname="accordian-body collapse" id="demo1">
					                <h1>Hi from the hiddenRow</h1>
					            </div>
					        </td>
					    </tr>
				</tbody>
			</table>*/}

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    if (i < 3) {
      products.push({
        id: id,
        name: 'Item name ' + id,
        price: 2100 + i,
        expand: [ {
          fieldA: 'test1',
          fieldB: (i + 1) * 99,
          fieldC: (i + 1) * Math.random() * 100,
          fieldD: '123eedd' + i
        }, {
          fieldA: 'test2',
          fieldB: i * 99,
          fieldC: i * Math.random() * 100,
          fieldD: '123eedd' + i
        } ]
      });
    } else {
      products.push({
        id: id,
        name: 'Item name ' + id,
        price: 2100 + i
      });
    }
  }
}
addProducts(5);

class BSTable extends React.Component {
  render() {
    if (this.props.data) {
      return (console.log(this.props),
      	<div>{this.props.data.id}</div>
        );
    } else {
      return (<p>?</p>);
    }
  }
}

export default class TableComponent extends Component {
  constructor(props) {
    super(props);
  }

  isExpandableRow(row) {
    if (row.id < 3) return true;
    else return false;
  }

  expandColumnComponent({ isExpandableRow, isExpanded }) {
    let content = '';

    if (isExpandableRow) {
      content = (isExpanded ? <Glyphicon glyph="chevron-down" /> : <Glyphicon glyph="chevron-up" /> );
    } else {
      content = ' ';
    }
    return (
      <div> { content } </div>
    );
  }

  expandComponent(row) {
    return (
      <BSTable data={ row } />
    );
  }

  render() {
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
    return (
      <BootstrapTable data={ products }
        options={ options }
        expandableRow={ this.isExpandableRow }
        expandComponent={ this.expandComponent }
        expandColumnOptions={ {
          expandColumnVisible: true,
          expandColumnComponent: this.expandColumnComponent,
          columnWidth: 50
        }}>
        <TableHeaderColumn width='150' dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='name'>Product Name</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='price'>Product Price</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='uu'>Product ID</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='aa'>Product Name</TableHeaderColumn>
        <TableHeaderColumn width='150' dataField='bb'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

// class TableComponent extends Component {
// 	// constructor(props) {
// 	// 	super(props)
// 	// 	this.state = {detailed: false}
// 	// 	this.toggle = this.toggle.bind(this)
// 	// }
  
// 	// toggle() {
// 	// 	console.log(this.state.detailed)
// 	// 	this.setState({detailed: !this.state.detailed})
// 	// }
// 	render(){
// 		return(
			
// 		)
// 	}
// }

// function mapStateToProps(state, ownProps) {
// 	return {
// 		// pageId : ownProps.match.params.stepId
// 	};
// }


// export default connect (mapStateToProps) (TableComponent);