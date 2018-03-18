import React, { Component } from 'react'
import { Grid, Row, Col, Table, Button, Glyphicon } from 'react-bootstrap'
import SubCategory from './components/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addSubCategory } from './actions'
import { isModalVisible } from '../../../components/Modal/actions'
import Modal from '../../../components/Modal'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderInput from '../../../components/Fields/input'
import ToggleableComponent from '../../../components/Toggleable/'
import './styles/style.css'

function validate() {

}

class CF extends Component {

  addCategory() {
    const { isModalVisible } = this.props;
    isModalVisible(true, 'categories', {})
  }

  openIntercom() {
    const { isModalVisible } = this.props;
    isModalVisible(true, 'intercom', {})
  }

  addSubCategory(category, categoryPositionIndex) {
    const { isModalVisible } = this.props;
    isModalVisible(
      true,
      'sub-categories',
      {
        categoryId: category.id,
        categoryPositionIndex: categoryPositionIndex
      }
    )
  }

  render() {
    const { categories, isVisible } = this.props;

    return (
      <Grid fluid>
        <Row className="show-grid header-frame">
          <Col xs={12} md={6}>
            <Button onClick={this.addCategory.bind(this)} bsStyle="action-button font-icon">
              <Glyphicon glyph="plus" />
            </Button>
          </Col>
          <Col xs={12} md={6} className="align-right">
            <Button onClick={this.openIntercom.bind(this)} bsStyle="action-button">
              Intercom
            </Button>
          </Col>
        </Row>
        <Row className="show-grid is-flex body-frame">
          {
            categories.map((category, categoryPositionIndex) =>
              <Col xs={12} md={12} className="frame">
                <Col xs={12} md={12} className="categories">
                  <Col xs={12} md={5}>
                      <Field type="text" disabled={true} name={`categories[${categoryPositionIndex}].name`} placeholder="Nom" component={renderInput}>Nom</Field>
                  </Col>
                  <ToggleableComponent>
                    <Col xs={12} md={12}>
                      <Button onClick={this.addSubCategory.bind(this, category, categoryPositionIndex)} bsStyle="action-button font-icon">
                        <Glyphicon glyph="plus" />
                      </Button>
                    </Col>
                    <Col xs={12} md={12} className='sub-categories'>
                      {
                        category.subCategory.map((subCategory, subCategoryId) =>
                          <SubCategory categoryId={categoryPositionIndex} subCategory={subCategory} subCategoryId={subCategoryId} />
                        )
                      }
                    </Col>
                  </ToggleableComponent>
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
