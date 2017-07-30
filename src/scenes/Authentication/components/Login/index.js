import React, { Component } from 'react'
import renderInput from '../../../../components/Fields/input'
import { Grid, Row, Col, Button, Image, Checkbox } from 'react-bootstrap'
import { withRouter, Link } from "react-router-dom"
import { Field } from 'redux-form'

const LoginForm = () => (
	<div>
		<Field type="text" name="name" placeholder="Nom"  component={renderInput}>Nom :</Field>
		<Field type="password" name="password" placeholder="Mot de passe"  component={renderInput}>Mot de Passe :</Field>
		<Link to="/forgot-password">Mot de passe oublié ?</Link>
		<div className="connexion">
			<span>
				<Checkbox>
			      Se souvenir de moi ?
			    </Checkbox>
		    </span>
		    <span className="button">
				<Button type="submit">Connexion</Button>
			</span>
		</div>
	</div>
)

export default LoginForm;