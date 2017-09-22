import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'react-bootstrap'
import renderInput from '../../../../../../components/Fields/input'
import renderTextarea from '../../../../../../components/Fields/textarea'

const TeamCreationForm = () => (
    <div>
        <Field type="text" name="name" placeholder="Nom" component={renderInput}>Nom</Field>
        <Field type="text" name="description" placeholder="Description" label="Description" component={renderTextarea}>Description</Field>
    </div>
)

export default TeamCreationForm;