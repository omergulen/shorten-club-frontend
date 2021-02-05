import React, { useState } from "react"

import Container from './common/Container';
import NameHeader from './common/NameHeader';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';
import PinnedList from './common/PinnedList';
import PinnedNote from './common/PinnedNote';
import PinTextarea from './common/PinTextarea';

import '../pin.css';



const Notes = () => {
  const [pinNote, setPinNote] = useState('');
  const [pinTitle, setPinTitle] = useState('');
  const [pinnedValues, setPinnedValues] = useState([]);

  const handlePinNoteValueChange = (event) => {
    setPinNote(event.target.value);
  };

  const handlePinTitleValueChange = (event) => {
    setPinTitle(event.target.value);
  };

  const handleAddClicked = () => {
    if (pinTitle || pinNote) {
      setPinnedValues([
        {title: pinTitle, note: pinNote},
        ...pinnedValues,
      ]);
      setPinNote('');
      setPinTitle('');
    }
  };

  const handleDeleteClicked = (index) => {
    const array = [...pinnedValues]; // make a separate copy of the array
    array.splice(index, 1);
    setPinnedValues(array);
  };

  const pinCode = '123456';

  return (
    <OuterContainer>
      <Container>
        {pinnedValues && (
          <PinnedList>
          {pinnedValues.map((props, index) => (
            <PinnedNote
              handleDelete={() => handleDeleteClicked(index)}
              key={index}
              {...props}
            />
          ))}
        </PinnedList>
        )}
        <NameHeader>
          {pinCode}
        </NameHeader>
        <PinInput
          autocomplete="off"
          autoFocus
          onChange={handlePinTitleValueChange}
          placeholder="Title"
          type="tel"
          value={pinTitle}
        />
        <PinTextarea
          onChange={handlePinNoteValueChange}
          placeholder="Note..."
          rows={2}
          value={pinNote}
        />
        <PinButton
          onClick={handleAddClicked}
        >
          Add
        </PinButton>
      </Container>
    </OuterContainer>
  );
}

export default Notes;
