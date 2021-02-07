import React, { useCallback, useEffect, useState } from "react";
import copy from 'copy-to-clipboard';

import Container from './common/Container';
import SlugHeader from './common/SlugHeader';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';
import PinnedLink from "./common/PinnedLink";
import PinnedList from "./common/PinnedList";

import { getRecord, initialSlug, updateRecord } from "../api";

const Links = ({ id, location }) => {
  const [slug, setSlug] = useState('');
  const [pinValue, setPinValue] = useState('');
  const [pinTitle, setPinTitle] = useState('');
  const [pinnedValues, setPinnedValues] = useState([]);
  const [permissions, setPermissions] = useState({
    readContent: true,
    updateContent: true
  });
  const [isCopied, setIsCopied] = useState(false);
  const handleAddressCopy = useCallback((event) => {
      const slug = event.target.innerText;
      const url = `https://shorten.club/${slug}`
      copy(url);
      setIsCopied(true);
      setTimeout(() => {
          setIsCopied(false);
      }, 1500);
  });

  useEffect(() => {
    const _getRecord = async (id) => {
      const res = await getRecord(id);
      const { record: { content, slug }, permissions } = res.data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
    }

    const _createRecord = async () => {
      const res = await initialSlug('LINK');
      const { record: { content, slug }, permissions } = res.data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
    }

    if (location && location.state && location.state.data) {
      const { record: { content, slug }, permissions } = data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
    } else if (id) {
      _getRecord(id);
    } else {
      _createRecord();
    }
  }, [id]);

  const handlePinValueChange = (event) => {
    setPinValue(event.target.value);
  };

  const handlePinTitleValueChange = (event) => {
    setPinTitle(event.target.value);
  };

  const handleAddClicked = () => {
    if (pinTitle || pinValue) {
      const newPinnedValues = [
        {title: pinTitle, url: pinValue},
        ...pinnedValues,
      ];
      setPinnedValues(newPinnedValues);
      setPinValue('');
      setPinTitle('');

      updateRecord(slug, newPinnedValues);
    }
  };
  const handleDeleteClicked = (index) => {
    const array = [...pinnedValues]; // make a separate copy of the array
    array.splice(index, 1);
    setPinnedValues(array);
  };

  return (
    <OuterContainer>
      <Container>
        <SlugHeader onClick={handleAddressCopy}  className={'slug-header'}>
          {slug}
        </SlugHeader>
        {isCopied && <p>Copied</p>}
        {permissions.readContent && pinnedValues && (
          <PinnedList>
            {pinnedValues.map((props, index) => (
              <PinnedLink
                handleDelete={() => handleDeleteClicked(index)}
                updateContent={permissions.updateContent}
                key={index}
                {...props}
              />
            ))}
          </PinnedList>
        )}
        {permissions.updateContent && (
          <>
            <PinInput
              autocomplete="off"
              autoFocus
              onChange={handlePinTitleValueChange}
              placeholder="Title"
              type="tel"
              value={pinTitle}
            />
            <PinInput
              autocomplete="off"
              autoFocus
              placeholder="https://example.com"
              type="tel"
              onChange={handlePinValueChange}
              value={pinValue}
            />
            <PinButton
              onClick={handleAddClicked}
            >
              Add
            </PinButton>
          </>
        )}
      </Container>
    </OuterContainer>
  );
}

export default Links;

