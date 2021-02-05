import React from "react";

import DeleteButton from './DeleteButton';
import Note from './Note';
import PinnedItem from './PinnedItem';
import Title from './Title';

const PinnedNote = ({ title, note, handleDelete }) => (
  <PinnedItem style={{
    lineHeight: '1rem',
    textAlign: 'left',
    color: '#333333',
  }}>
    <DeleteButton onClick={handleDelete}>
      X
    </DeleteButton>
    {title && (
      <Title>
        {title}
      </Title>
    )}
    {note && (
      <Note>
        {note}
      </Note>
    )}
  </PinnedItem>
);

export default PinnedNote;
