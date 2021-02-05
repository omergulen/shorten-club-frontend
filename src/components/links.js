import React, { useState } from "react"

import Container from './common/Container';
import NameHeader from './common/NameHeader';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';
import PinnedLink from "./common/PinnedLink";
import PinnedList from "./common/PinnedList";

import '../pin.css';

const Links = () => {
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
        {title: pinTitle, url: pinValue},
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
          <PinnedList>
            {pinnedValues.map((props, index) => (
              <PinnedLink
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
        <PinInput
          name="pin"
          type="tel"
          placeholder="https://example.com"
          id="pin-input"
          className="sc-dlfnbm lflLbn"
          autocomplete="off"
          value={pinValue}
          onChange={handlePinValueChange}
          aria-expanded="false"
          autoFocus
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

export default Links;

