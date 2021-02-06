import React, { useState } from "react";
import { navigate } from 'gatsby';

import Container from './common/Container';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';

import { getRecord } from '../api';

const Home = (props) => {
  console.log('props: ', props);
  const [pinValue, setPinValue] = useState('');

  const handlePinValueChange = (event) => {
    setPinValue(event.target.value);
  };

  const handleEnterClick = async () => {
    const mapping = {
      'LINK': 'links',
      'NNOTE': 'notes',
    };
    const res = await getRecord(pinValue);
    const { record: { slug, type } } = res.data;
    navigate(
      `${mapping[type]}/${slug}`,
      {
        state: { 
          data: res.data
         },
      }
    )
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
          onClick={handleEnterClick}
        >
          Enter
        </PinButton>
      </Container>
    </OuterContainer>
  );
}


export default Home
