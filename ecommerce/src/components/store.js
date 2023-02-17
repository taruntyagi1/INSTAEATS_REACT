
import rootreducer from "./reducer";
import { configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'root',
    storage,
  };

  
const persistedReducer = persistReducer(persistConfig, rootreducer);

const store = configureStore(
    {reducer :persistedReducer}
);
export const persistor = persistStore(store);

export default store