import { createStore } from 'redux';
import rootReducer from './reducers'; // assumes you have created reducers

const store = createStore(rootReducer); // create the Redux store using the rootReducer

export default store;
