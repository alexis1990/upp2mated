import React, { Component } from 'react'
import { Grid, Row, Col, Table, Button } from 'react-bootstrap'
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
    isModalVisible(true, 'categories')
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
      <Grid >
        <Row className="show-grid is-flex" style={{ padding: "20px", border: "1px solid black" }}>
          <Col xs={12} md={3}>
            Catégories
          </Col>
          <Col xs={12} md={3}>
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
        <Button onClick={this.addCategory.bind(this)}>+</Button>
        <Row className="show-grid is-flex">
          {
            categories.map((category, categoryId) =>
              <Col xs={12} md={12} className="frame">
                <Col xs={12} md={3} className="categories">
									{/* {category.name} */}
									<Field type="text" name={`categories[${categoryId}].name`} placeholder="Nom" component={renderInput}>Nom</Field>
                  <Button onClick={this.addSubCategory.bind(this, category, categoryId)}>+</Button>
                </Col>
								{
									category.subCategory.map((subCategory, subCategoryId) =>
										<Sign categoryId={categoryId} subCategory={subCategory} subCategoryId={subCategoryId} />
									)
								}
              </Col>
            )
          }

        </Row>
      </Grid >
    )
  }
}

function mapStateToProps(state) {
	console.log('state.form.CF.categories', state.form.CF.categories)
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
