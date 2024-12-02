// store/actions/chat.actions.ts
import { Action, Dispatch } from 'redux';
import api from '../../services/api';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/index';
import conversationService from '../../services/conversation.service';

// Action Types
export const FETCH_CHAT_REQUEST = 'FETCH_CHAT_REQUEST';
export const FETCH_CHAT_SUCCESS = 'FETCH_CHAT_SUCCESS';
export const FETCH_CHAT_FAILURE = 'FETCH_CHAT_FAILURE';

export const UPDATE_CHAT = 'UPDATE_CHAT';
export const UPDATE_CHAT_FAILURE = 'UPDATE_CHAT_FAILURE';
export const UPDATE_CHAT_SUCCESS = 'UPDATE_CHAT_SUCCESS';

export const UPDATE_VOLUME_LEVEL = 'UPDATE_VOLUME_LEVEL';
export const UPDATE_ASSISTANCE_SPEAKING = 'UPDATE_ASSISTANCE_SPEAKING';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';

export const FETCH_TRANSCRIPT_NOTES_REQUEST = 'FETCH_TRANSCRIPT_NOTES_REQUEST';
export const FETCH_TRANSCRIPT_NOTES_SUCCESS = 'FETCH_TRANSCRIPT_NOTES_SUCCESS';
export const FETCH_TRANSCRIPT_NOTES_FAILURE = 'FETCH_TRANSCRIPT_NOTES_FAILURE';

// Action Creators
export const fetchChatRequest = () => ({
    type: FETCH_CHAT_REQUEST,
});

export const fetchChatSuccess = (chat: any) => ({
    type: FETCH_CHAT_SUCCESS,
    payload: chat,
});

export const fetchChatFailure = (error: string) => ({
    type: FETCH_CHAT_FAILURE,
    payload: error,
});

export const updateChatRequest = (chat: any) => ({
    type: UPDATE_CHAT
});
export const updateChatError = (error: any) => ({
    type: UPDATE_CHAT,
    payload: error,
});
export const updateChatSuccess = (chat: any) => ({
    type: UPDATE_CHAT,
    payload: chat,
});
export const updateConversation = (conversation: { role: string, content: string }[]) => ({
    type: UPDATE_CONVERSATION,
    payload: conversation,
});
export const updateVolumeLevel = (level: number) => {
    return ({
        type: UPDATE_VOLUME_LEVEL,
        payload: level,
    })
};
export const fetchTranscriptNotesRequest = () => ({
    type: FETCH_TRANSCRIPT_NOTES_REQUEST,
});

export const fetchTranscriptNotesSuccess = (data: { transcript: any; notes: any }) => ({
    type: FETCH_TRANSCRIPT_NOTES_SUCCESS,
    payload: data,
});

export const fetchTranscriptNotesFailure = (error: string) => ({
    type: FETCH_TRANSCRIPT_NOTES_FAILURE,
    payload: error,
});

export const updateAssistanceSpeaking = (speaking: boolean) => ({
    type: UPDATE_ASSISTANCE_SPEAKING,
    payload: speaking,
});



export const fetchChat = (id: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CHAT_REQUEST });
        const response = await api.get(`/chat/get/${id}`);
        dispatch({ type: FETCH_CHAT_SUCCESS, payload: response.data });
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: FETCH_CHAT_FAILURE, payload: error.message });
        } else {
            dispatch({ type: FETCH_CHAT_FAILURE, payload: 'An unknown error occurred' });
        }
    }
}

export const updateChat = (chatId: string, data: any): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CHAT });
        const response = await api.put(`/chat/update/${chatId}`, { data });
        dispatch({ type: UPDATE_CHAT_SUCCESS, payload: response.data });
    } catch (error) {
        if (error instanceof Error) {
            dispatch({ type: UPDATE_CHAT_FAILURE, payload: error.message });
        } else {
            dispatch({ type: UPDATE_CHAT_FAILURE, payload: 'An unknown error occurred' });
        }
    }
};

export const fetchTranscriptNotes = (callId: string): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
    dispatch(fetchTranscriptNotesRequest());
    try {
      const response = await conversationService.currentCall(callId);
      dispatch(fetchTranscriptNotesSuccess(response.data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchTranscriptNotesFailure(error.message));
      } else {
        dispatch(fetchTranscriptNotesFailure('An unknown error occurred'));
      }
    }
  };
