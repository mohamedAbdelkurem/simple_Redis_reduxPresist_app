import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import { persistReducer ,createMigrate} from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from "./user"



const persistConfig = {
  key: 'root',
  storage,
  

};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: { users: persistedReducer },
  middleware: [thunk],

});



export default store;