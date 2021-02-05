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
        <PinButton>
          Enter
        </PinButton>
      </Container>
    </OuterContainer>
  );
}


export default Home
