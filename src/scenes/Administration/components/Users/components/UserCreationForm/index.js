import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'react-bootstrap'
import renderInput from '../../../../../../components/Fields/input'
import renderTextarea from '../../../../../../components/Fields/textarea'

const UserCreationForm = () => (
    <div>
        <Field type="text" label="Login" name="login" placeholder="Login" component={renderInput}>Login</Field>
        <Field type="text" label="Prénom" name="firstname" placeholder="Prénom" component={renderInput}>Prénom</Field>
        <Field type="text" label="Nom" name="lastname" placeholder="Nom" component={renderInput}>Nom</Field>
        <Field type="text" label="Email" name="email" placeholder="Email" component={renderInput}>Email</Field>
        <Field type="text" label="Poste" name="job" placeholder="Poste" component={renderInput}>Poste</Field>
    </div>
)

export default UserCreationForm;