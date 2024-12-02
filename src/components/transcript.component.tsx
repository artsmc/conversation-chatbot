import React from 'react';
import styles from './transcript.style.module.scss';
interface TranscriptProps {
  transcript: {
    speaker: string;
    token: string;
    date: Date;
    transcript: string;
  }[];
}
const Transcript: React.FC<TranscriptProps> = ({ transcript }) => {
  if (!transcript || transcript.length === 0) {
    return <div>No transcript available.</div>;
  }

  return (
    <div>
      {transcript.map((message, index) => (
        <div key={index}>
          <p><strong>{message.speaker}</strong> ({new Date(message.date).toLocaleString()}): {message.transcript}</p>
        </div>
      ))}
    </div>
  );
};

export default Transcript;
