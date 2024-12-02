// pages/session/session.page.component.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styles from './session.styles.component.module.scss';
import Transcript from '../../components/transcript.component';
import Session from '../../components/session.component';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store';
import type { RootState } from '../../store/reducers/index';
import { fetchChat, fetchTranscriptNotes } from '../../store/actions/chat.actions';
import Note, { NoteProps } from '../../components/note.component';
const SessionPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/')[1];
  const chatState = useSelector((state: RootState) => state.chat) || { chat: null, loading: false, error: null };
  const { chat, loading, error, transcript, notes } = chatState;
  useEffect(() => {
    if (!chat || chat._id !== id) {
      // Fetch chat data if not available or if ID doesn't match
      if (id) {
        dispatch(fetchChat(id));
      } else {
        navigate('/dashboard'); // Redirect if no ID is provided
      }
    }
  }, [chat, id, dispatch, navigate]);

  useEffect(() => {
    if (chat && chat._id === id) {
      if (chat.vapi_call_id && chat.timecompleted) {
        dispatch(fetchTranscriptNotes(chat.vapi_call_id));
      }
    }
  }, [chat, id, dispatch]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }
  if (!chat) {
    return <div className={styles.noData}>No session data available.</div>;
  }

  return (
    <div className={styles.sessionPage}>
      {/* Left Column: Avatar and Timer */}
      <div className={styles.leftColumn}>
        <Session />
      </div>
      {/* Right Column: Transcript and Notes */}
      <div className={styles.rightColumn}>
        <div className={styles.transcriptSection}>
          <Transcript transcript={transcript?.messages || []} />
        </div>
        <div className={styles.notesSection}>
          <Note notes={notes}/>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;