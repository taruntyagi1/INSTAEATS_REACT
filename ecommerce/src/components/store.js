import { legacy_createStore as createStore } from 'redux';
import rootreducer from "./reducer";
import { configureStore} from '@reduxjs/toolkit'


const store = configureStore(
    {reducer :rootreducer}
);

export default store