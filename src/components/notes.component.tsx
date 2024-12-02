import React from 'react';
import styles from './notes.style.module.scss';

const Notes: React.FC = () => {
  const notes = Array(4).fill({
    title: 'October Update',
    date: '10/24/2024',
    content: 'In the Free AI Roadmap Call, Mark Campbell, a freelancer from Wunderman agency, sought guidance on transitioning to independent AI projects...',
  });

  return (
    <div className={styles.notesSection}>
      <h2>Notes</h2>
      <div className={styles.notesGrid}>
        {notes.map((note, index) => (
          <div key={index} className={styles.noteCard}>
            <h3>{note.title}</h3>
            <p>{note.date}</p>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
