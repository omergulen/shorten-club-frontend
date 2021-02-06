import React, { useState, useEffect } from "react";
import { navigate } from 'gatsby';

import Container from './common/Container';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';

import { getRecord } from '../api';

const Home = ({ id }) => {
  const [pinValue, setPinValue] = useState('');

  useEffect(() => {
    if (id) {
      handleSlugNavigation(id);
    }
  });

  const handleSlugNavigation = async (_slug) => {
    const mapping = {
      'LINK': 'links',
      'NNOTE': 'notes',
    };
    const res = await getRecord(_slug);
    const { record: { slug, type } } = res.data;
    navigate(
      `/${mapping[type] ?? '/'}/${slug}`,
      {
        state: { 
          data: res.data
         },
      }
    )
  };

  const handleEnterClick = () => {
    handleSlugNavigation(pinValue);
  };

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
          onClick={handleEnterClick}
        >
          Enter
        </PinButton>
      </Container>
    </OuterContainer>
  );
}


export default Home
