import React, { useState } from "react";

import Container from './Container';
import OuterContainer from './OuterContainer';
import PinButton from './PinButton';
import PinInput from './PinInput';

import '../pin.css';

const Home = () => {
  const [pinValue, setPinValue] = useState('');

  const handlePinValueChange = (event) => {
    setPinValue(event.target.value);
  };

  return (
    <OuterContainer>
      <Container>
        <PinInput
          type="tel"
          placeholder="PIN"
          autocomplete="off"
          value={pinValue}
          onChange={handlePinValueChange}
          autoFocus
        />
        <PinButton
          type="submit"
          value="Submit"
          className="enter-button__EnterButton-sc-1o9b9va-0 kfzgPK"
          data-functional-selector="join-game-pin"
        >
          Enter
        </PinButton>
      </Container>
    </OuterContainer>
  );
}


export default Home
