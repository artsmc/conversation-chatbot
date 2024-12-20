// store/reducers.ts
import { combineReducers } from 'redux';
import chatReducer from './reducers/chat.reducer';

const rootReducer = combineReducers({
  chat: chatReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;