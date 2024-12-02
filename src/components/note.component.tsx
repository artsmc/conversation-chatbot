import React from 'react';
import styles from './note.style.module.scss';
import { INote } from '../store/types';

export interface NoteProps {
  notes: INote | null;
}

const Note: React.FC<NoteProps> = ({notes}) => {
  if (!notes) {
    return <div>No notes available.</div>;
  }
  return (
    <div>
      <h3>Session Notes</h3>
      {notes.session_name && <p><strong>Session Name:</strong> {notes.session_name}</p>}
      {notes.note && (
        <>
          <p><strong>Summary:</strong> {notes.note.summary}</p>
          <p><strong>Key Takeaways:</strong> {notes.note.key_takeaways}</p>
          <p><strong>Tasks:</strong></p>
          <ul>
            {notes.note.tasks.map((task: string, index: React.Key) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
          <p><strong>Questions:</strong></p>
          <ul>
            {notes.note.questions.map((question:string, index: React.Key) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Note;
