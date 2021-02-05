import React, { useState } from "react";

import Container from './common/Container';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';

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
