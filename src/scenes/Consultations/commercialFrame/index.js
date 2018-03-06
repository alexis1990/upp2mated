import React, { Component } from 'react'
import { Grid, Row, Col, Table, Button, Glyphicon } from 'react-bootstrap'
import Sign from './components/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addSubCategory } from './actions'
import { isModalVisible } from '../../../components/Modal/actions'
import Modal from '../../../components/Modal'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderInput from '../../../components/Fields/input'
import './styles/style.css'

function validate() {

}

class CF extends Component {
  addCategory() {
    const { isModalVisible } = this.props;
    isModalVisible(true, 'categories', {})
  }

  addSubCategory(category, categoryId) {
    const { isModalVisible } = this.props;
		// addSubCategory(category, categoryId);
		isModalVisible(
			true, 
			'sub-categories', 
			{ 
				categoryId: categoryId
			}
		)
  }

  render() {
    const { categories, isVisible } = this.props;
    return (
      <Grid fluid>
        <Row className="show-grid header-frame">
          <Col xs={12} md={1}>
            <Button onClick={this.addCategory.bind(this)} bsStyle="action-button font-icon">
              <Glyphicon glyph="plus" />
            </Button>
          </Col>
          <Col xs={12} md={3}>
            Catégories
          </Col>
          <Col xs={12} md={2}>
            Sous Catégorie
          </Col>
          <Col xs={6} md={2}>
            Désignation
          </Col>
          <Col xs={6} md={2}>
            Volumes
          </Col>
          <Col xs={6} md={2}>
            Description
          </Col>
        </Row>
        <Row className="show-grid is-flex body-frame">
          {
            categories.map((category, categoryId) =>
              <Col xs={12} md={12} className="frame">
                <Col xs={12} md={3} className="categories">
									{/* {category.name} */}
									<Field type="text" disabled={true} name={`categories[${categoryId}].name`} placeholder="Nom" component={renderInput}>Nom</Field>
                  <Button onClick={this.addSubCategory.bind(this, category, categoryId)} bsStyle="action-button font-icon">
                    <Glyphicon glyph="plus" />
                  </Button>
                </Col>
								<Col xs={12} md={9} className="sub-categories">
								{
									category.subCategory.map((subCategory, subCategoryId) =>
										<Sign categoryId={categoryId} subCategory={subCategory} subCategoryId={subCategoryId} />
									)
								}
								</Col>
              </Col>
            )
          }

        </Row>
      </Grid >
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.form.CF.values.categories,
    isVisible: state.modal.mode,
  }
}

function mapDispatchToProps() {
  return (dispatch) => bindActionCreators({ isModalVisible, addSubCategory }, dispatch)
}

CF = connect(mapStateToProps, mapDispatchToProps)(CF);

export default reduxForm({
	form: 'CF',
  validate
})(CF)
