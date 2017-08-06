import React from 'react'
import './axios.config'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import App from './App/App'
import 'react-dates/lib/css/_datepicker.css'
import './index.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
  	<BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  target
)