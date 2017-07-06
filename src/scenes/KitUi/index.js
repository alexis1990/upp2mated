import React from 'react'
import { FormGroup, FormControl, HelpBlock, ControlLabel, Radio, Checkbox, Button } from 'react-bootstrap'
import RangeTimePicker from '../../components/RangeTimePicker/index'
import SingleTimePicker from '../../components/SingleTimePicker/index'
import Input from '../../components/Fields/input'
import Select from '../../components/Fields/select'
import { Field, reduxForm } from 'redux-form'

const KitUi = () => (
	 <form>
    <Field type="text" name="aa" placeholder="Libellé" component={Input}>Libellé</Field>
    <SingleTimePicker label="Date de clôture" controlId="deezd" />
    <Field componentClass="select" name="aaddd" placeholder="nature" component={Select} >Nature</Field>
	 <RangeTimePicker />
    <Checkbox checked readOnly>
      Checkbox
    </Checkbox>
    <Radio checked readOnly>
      Radio
    </Radio>

    <FormGroup>
      <Checkbox inline>
        1
      </Checkbox>
      {' '}
      <Checkbox inline>
        2
      </Checkbox>
      {' '}
      <Checkbox inline>
        3
      </Checkbox>
    </FormGroup>
    <FormGroup>
      <Radio name="radioGroup" inline>
        1
      </Radio>
      {' '}
      <Radio name="radioGroup" inline>
        2
      </Radio>
      {' '}
      <Radio name="radioGroup" inline>
        3
      </Radio>
    </FormGroup>

    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>
    <FormGroup controlId="formControlsSelectMultiple">
      <ControlLabel>Multiple select</ControlLabel>
      <FormControl componentClass="select" multiple>
        <option value="select">select (multiple)</option>
        <option value="other">...</option>
      </FormControl>
    </FormGroup>

    <FormGroup controlId="formControlsTextarea">
      <ControlLabel>Textarea</ControlLabel>
      <FormControl componentClass="textarea" placeholder="textarea" />
    </FormGroup>

    <FormGroup>
      <ControlLabel>Static text</ControlLabel>
      <FormControl.Static>
        email@example.com
      </FormControl.Static>
    </FormGroup>

    <Button type="submit">
      Submit
    </Button>
  </form>
)


export default KitUi;