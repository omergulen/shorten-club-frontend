import React, { useMemo } from "react";

import DeleteButton from './DeleteButton';
import Note from './Note';
import PinnedItem from './PinnedItem';
import Title from './Title';

const PinnedNote = ({
  handleDelete,
  index,
  note,
  handleBodyChange,
  handleTitleChange,
  handleNoteSave,
  title,
  updateContent,
}) => {

  const rowCounts = useMemo(() => {
    const lines = note.split('\n');
    let count = lines.length;
    lines.forEach(line => {
      if (line.length > 80) {
        const innerLines = Math.floor(line.length / 90);
        count += innerLines;
      }
    });
    return count;
  }, [note]);

  return (
    <PinnedItem
      className={updateContent ? 'draggable' : ''}
      style={{
        color: '#333333',
        lineHeight: '1rem',
        padding: '1rem 2rem',
        textAlign: 'left',
      }}
    >
      {updateContent && (
        <DeleteButton onClick={handleDelete}>
          X
        </DeleteButton>
      )}
      {title && (
        <Title
          name={`note_title_${index}`}
          onChange={handleTitleChange}
          onSave={handleNoteSave}
          readonly={!updateContent}
          value={title}
        />
      )}
      {note && (
        <Note
          name={`note_body_${index}`}
          onChange={handleBodyChange}
          onSave={handleNoteSave}
          readonly={!updateContent}
          value={note}
          rows={rowCounts}
        />
      )}
    </PinnedItem>
  );
};

export default PinnedNote;
