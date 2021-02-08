import React, { useState, useEffect } from "react";
import { navigate } from 'gatsby';

import Container from './common/Container';
import NameHeader from './common/NameHeader';
import NameSubHeader from './common/NameSubHeader';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';

import { getRecord } from '../api';

const Home = ({ id }) => {
  const [pinValue, setPinValue] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      handleSlugNavigation(id);
    } else {
      setLoading(false);
    }
  });

  const handleSlugNavigation = async (_slug) => {
    const mapping = {
      'LINK': 'links',
      'NOTE': 'notes',
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

  if (loading) {
    return (
      <OuterContainer>
        <Container>
          <div className={'loading-spinner'}></div>
        </Container>
      </OuterContainer>
    );
  }

  return (
    <OuterContainer>
      <Container>
        <NameHeader>
          Enter the PIN!
        </NameHeader>
        <NameSubHeader>
          The PIN allows you to access various content.
        </NameSubHeader>
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
