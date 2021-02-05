import React, { useState } from "react"

import Container from './Container';
import NameHeader from './NameHeader';
import OuterContainer from './OuterContainer';
import PinButton from './PinButton';
import PinInput from './PinInput';
import PinNote from './PinNote';

import '../pin.css';



const Notes = () => {
  const [pinValue, setPinValue] = useState('');
  const [pinTitle, setPinTitle] = useState('');
  const [pinnedValues, setPinnedValues] = useState([]);

  const handlePinValueChange = (event) => {
    setPinValue(event.target.value);
  };

  const handlePinTitleValueChange = (event) => {
    setPinTitle(event.target.value);
  };

  const handleAddClicked = () => {
    if (pinTitle || pinValue) {
      setPinnedValues([
        {title: pinTitle, note: pinValue},
        ...pinnedValues,
      ]);
      setPinValue('');
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
          <ul className={'pinned-values'}>
          {pinnedValues.map(({title, note}, index) => {
            return (
              <li className="note" key={index}>
                <p className="delete-button" onClick={() => handleDeleteClicked(index)}>X</p>
                {title && (<p className="note-title">{title}</p>)}
                <p className="note-text">
                  {note}
                </p>
              </li>
            )
          })}
        </ul>
        )}
        <NameHeader>
          {pinCode}
        </NameHeader>
        <PinInput
          name="pin-description"
          type="tel"
          placeholder="Title"
          id="description-input"
          className="sc-dlfnbm lflLbn"
          autocomplete="off"
          value={pinTitle}
          onChange={handlePinTitleValueChange}
          aria-expanded="false"
          autoFocus
        />
        <PinNote
          placeholder="Note..."
          id="pin-input"
          className="sc-dlfnbm lflLbn"
          autocomplete="off"
          value={pinValue}
          rows={10}
          onChange={handlePinValueChange}
        />
        <PinButton
          className="enter-button__EnterButton-sc-1o9b9va-0 kfzgPK"
          onClick={handleAddClicked}
        >
          Add
        </PinButton>
      </Container>
    </OuterContainer>
  );
}

export default Notes;
