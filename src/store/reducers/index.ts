// store/reducers/index.ts
import { combineReducers } from 'redux';
import chatReducer from './chat.reducer';
// import other reducers...

const rootReducer = combineReducers({
  chat: chatReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;