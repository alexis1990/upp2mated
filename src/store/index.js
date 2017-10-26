import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import { syncTranslationWithStore, loadTranslations, setLocale } from 'react-redux-i18n';
import rootReducer from './modules'

const translationsObject = {
	en: {
	  application: {
		title: 'Awesome app with i18n!',
		hello: 'Hello, %{name}!'
	  },
	  date: {
		long: 'MMMM Do, YYYY'
	  },
	  export: 'Export %{count} items',
	  export_0: 'Nothing to export',
	  export_1: 'Export %{count} item',
	  two_lines: 'Line 1<br />Line 2'
	},
	nl: {
	  application: {
		title: 'Toffe app met i18n!',
		hello: 'Hallo, %{name}!'
	  },
	  date: {
		long: 'D MMMM YYYY'
	  },
	  export: 'Exporteer %{count} dingen',
	  export_0: 'Niks te exporteren',
	  export_1: 'Exporteer %{count} ding',
	  two_lines: 'Regel 1<br />Regel 2'
	}
  };

export const history = createHistory()

const initialState = {}

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationsObject));
const isLangDefined = () => sessionStorage.getItem('lang');

if(isLangDefined()) {
  store.dispatch(setLocale(sessionStorage.getItem('lang')));
} else {
  store.dispatch(setLocale('en'));
}

export default store