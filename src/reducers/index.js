import { combineReducers } from 'redux'

import ThemeOptions from './ThemeOptions'
import AjaxReducer from './ajax'

export default combineReducers({
  AjaxReducer,
  ThemeOptions
})