// store/index.ts
import { AnyAction } from 'redux';
import rootReducer from './reducers';
import { configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk';

const store = configureStore({ reducer: rootReducer })

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type RootState = ReturnType<typeof rootReducer>;

export default store;