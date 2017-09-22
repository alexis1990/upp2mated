import React from 'react'
import './styles/textarea.css'

const renderTextArea = ({input, label, placeholder, meta: { touched, error, warning }}) => (
    <div>
        <label>{label}</label>
        <div>
            <textarea {...input} placeholder={placeholder} rows="10" cols="40" className="textarea"/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

export default renderTextArea;