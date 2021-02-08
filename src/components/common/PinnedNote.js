import React from "react";

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
}) => (
  <PinnedItem style={{
    lineHeight: '1rem',
    textAlign: 'left',
    color: '#333333',
  }}>
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
      />
    )}
  </PinnedItem>
);

export default PinnedNote;
