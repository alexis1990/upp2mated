import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'react-bootstrap'
import renderInput from '../../../../../components/Fields/input'

const TeamCreationForm = () => (
    <div>
        <Field type="text" name="name" placeholder="Nom" component={renderInput} disabled>Nom</Field>
        <Button type="submit">
            Submit
        </Button>
    </div>
)

export default TeamCreationForm;