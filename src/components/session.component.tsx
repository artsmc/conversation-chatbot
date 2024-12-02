// components/session.component.tsx
import React, { useCallback, useEffect, useState } from 'react';
import styles from './session.style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTranscriptNotesSuccess, updateAssistanceSpeaking, updateChat, updateConversation, updateVolumeLevel } from '../store/actions/chat.actions';
import Vapi from '@vapi-ai/web';
import { AppDispatch, RootState } from '../store';
import Avatar from './avatar.component';
import Timer from './timer.component';
import api from '../services/api';
import conversationService from '../services/conversation.service';

// Put your Vapi Public Key below.
const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC || '');

interface SessionProps {}

const Session: React.FC<SessionProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const chat = useSelector((state: RootState) => state.chat.chat);
  const convo = useSelector((state: RootState) => state.chat.conversation);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();
  const handleCallStart = useCallback(() => {
    setConnecting(false);
    setConnected(true);
    setShowPublicKeyInvalidMessage(false);
  }, [setConnecting, setConnected, setShowPublicKeyInvalidMessage]);

  const handleCallEnd = useCallback(() => {
    setConnecting(false);
    setConnected(false);
    setShowPublicKeyInvalidMessage(false);
    if (chat.vapi_call_id) {
      const pollInterval = setInterval(async () => {
      try {
        const response = await conversationService.currentCall(chat.vapi_call_id);
        if (response.data.transcript && response.data.notes) {
        dispatch(fetchTranscriptNotesSuccess(response.data));
        clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Error fetching transcript and notes:', error);
      }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(pollInterval);
    }
  }, [chat.vapi_call_id, dispatch, setShowPublicKeyInvalidMessage]);

  const handleSpeechStart = useCallback(() => {
    dispatch(updateAssistanceSpeaking(true));
  }, [dispatch]);

  const handleSpeechEnd = useCallback(() => {
    dispatch(updateAssistanceSpeaking(false));
  }, [dispatch]);

  const handleVolumeLevel = useCallback((level:number) => {
    dispatch(updateVolumeLevel(level));
  }, [dispatch]);

  const handleError = useCallback((error: any) => {
    console.error(error);
    setConnecting(false);
    if (isPublicKeyMissingError({ vapiError: error })) {
      setShowPublicKeyInvalidMessage(true);
    }
  }, [setConnecting, setShowPublicKeyInvalidMessage]);

  const handleMessage = useCallback((message: any) => {
   const send = vapi.send({ type: 'add-message', message:{
      role: 'system',
      message: 'Message received',
    }});
    console.log(send)
    if(message.type === 'conversation') {
      if (convo.conversation.length < message.conversation.length){
        dispatch(updateConversation(message.conversation));
      }
    }
  }, []);

  useEffect(() => {
    vapi.on('call-start', handleCallStart);
    vapi.on('call-end', handleCallEnd);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('volume-level', handleVolumeLevel);
    vapi.on('error', handleError);
    vapi.on('message', handleMessage);

    // Clean up event listeners when component unmounts
    return () => {
      vapi.off('call-start', handleCallStart);
      vapi.off('call-end', handleCallEnd);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('volume-level', handleVolumeLevel);
      vapi.off('error', handleError);
      vapi.off('message', handleMessage);
    };
  }, [chat._id, dispatch, handleCallStart, handleCallEnd, handleSpeechStart, handleSpeechEnd, handleVolumeLevel, handleError, handleMessage]);

  // Call start handler
  const startCallInline = async () => {
    setConnecting(true);
    try {
      const start = await vapi.start(chat.avatar.vapi_id);
      const data = {
        vapi_call_id: start?.id,
        timestarted: start?.updatedAt,
      };
      dispatch(updateChat(chat._id, data));
      // The 'call-start' event handler will take care of updating the chat
    } catch (error) {
      console.error('Error starting call:', error);
      setConnecting(false);
    }
  };
  const endCall = () => {
    vapi.stop();
  };
  if (!chat) {
    return <div>No chat data available.</div>;
  }

  return (
    <div className={styles.session}>
      <Avatar startCall={startCallInline} endCall={endCall} connected={connected} connecting={connecting} />
      <Timer />
      <div className={styles.sessionFooter}>
        <span>Made With</span>
        <img src="/images/vapi.png" alt="Vapi Logo" width="100px"/>
      </div>
    </div>
  );
};

interface VapiError {
  error: {
    statusCode: number;
    error: string;
  };
}

export const isPublicKeyMissingError = ({ vapiError }: { vapiError: VapiError }) => {
  return !!vapiError && vapiError.error.statusCode === 403 && vapiError.error.error === 'Forbidden';
};

const usePublicKeyInvalid = () => {
  const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

  // Close public key invalid message after delay
  useEffect(() => {
    if (showPublicKeyInvalidMessage) {
      const timer = setTimeout(() => {
        setShowPublicKeyInvalidMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPublicKeyInvalidMessage]);

  return {
    showPublicKeyInvalidMessage,
    setShowPublicKeyInvalidMessage,
  };
};

export default Session;
