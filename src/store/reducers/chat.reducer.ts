// store/reducers/chat.reducer.ts
import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  UPDATE_CHAT_SUCCESS,
  UPDATE_VOLUME_LEVEL,
  UPDATE_ASSISTANCE_SPEAKING,
  UPDATE_CONVERSATION,
  FETCH_TRANSCRIPT_NOTES_REQUEST,
  FETCH_TRANSCRIPT_NOTES_SUCCESS,
  FETCH_TRANSCRIPT_NOTES_FAILURE,
} from '../actions/chat.actions';
import { INote, Transcript } from '../types';

interface ChatState {
  chat: any;
  conversation: {
    connected: boolean;
    connecting: boolean;
    assistanceSpeaking: boolean;
    volumeLevel: number;
    conversation: any[];
  };
  loading: boolean;
  error: string | null;
  transcript: Transcript | null;
  notes: INote | null;
}

const initialState: ChatState = {
  chat: null,
  conversation: {
    connected: false,
    connecting: false,
    assistanceSpeaking: false,
    volumeLevel: 0,
    conversation: [],
  },
  loading: false,
  error: null,
  transcript: null,
  notes: null,
};

const chatReducer = (state = initialState, action: any): ChatState => {
  switch (action.type) {
    case UPDATE_VOLUME_LEVEL:
      return { ...state, conversation:{
        ...state.conversation,
        volumeLevel: action.payload
      } };
    case UPDATE_ASSISTANCE_SPEAKING:
      return { ...state, conversation:{
        ...state.conversation,
        assistanceSpeaking: action.payload
      } };
    case UPDATE_CONVERSATION:
      return { ...state, conversation:{
        ...state.conversation,
        conversation: action.payload
      } };
    case FETCH_CHAT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CHAT_SUCCESS:
      return { ...state, loading: false, chat: action.payload };
    case FETCH_CHAT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_CHAT_SUCCESS:
      return { ...state, chat: action.payload };
    case FETCH_TRANSCRIPT_NOTES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TRANSCRIPT_NOTES_SUCCESS:
      return { ...state, loading: false, transcript: action.payload.transcript, notes: action.payload.notes };
    case FETCH_TRANSCRIPT_NOTES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default chatReducer;