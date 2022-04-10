import {createStore} from 'redux'
import {songReducer,queSongReducer}from './reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    songReducer,
    queSongReducer
})

export const store = createStore(rootReducer);