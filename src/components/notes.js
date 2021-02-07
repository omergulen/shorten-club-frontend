import React, { useCallback, useEffect, useState } from "react";
import copy from 'copy-to-clipboard';

import Container from './common/Container';
import SlugHeader from './common/SlugHeader';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';
import PinnedList from './common/PinnedList';
import PinnedNote from './common/PinnedNote';
import PinTextarea from './common/PinTextarea';

import { getRecord, initialSlug, updateRecord } from "../api";

const Notes = ({ id, location }) => {
  const [slug, setSlug] = useState('');
  const [pinNote, setPinNote] = useState('');
  const [pinTitle, setPinTitle] = useState('');
  const [pinnedValues, setPinnedValues] = useState([]);
  const [permissions, setPermissions] = useState({
    readContent: true,
    updateContent: true
  });
  const [isCopied, setIsCopied] = useState(false);
  const handleAddressCopy = useCallback((event) => {
      const slug = event.target.innerText;
      const url = `https://shorten.club/notes/${slug}`
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
      const res = await initialSlug('NOTE');
      const { record: { content, slug }, permissions } = res.data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
    }

    const { state: { data } } = location;
    if (data) {
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


  const handlePinNoteValueChange = (event) => {
    setPinNote(event.target.value);
  };

  const handlePinTitleValueChange = (event) => {
    setPinTitle(event.target.value);
  };

  const handleAddClicked = () => {
    if (pinTitle || pinNote) {
      const newPinnedValues = [
        {title: pinTitle, note: pinNote},
        ...pinnedValues,
      ];
      setPinnedValues(newPinnedValues);
      setPinNote('');
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
        <SlugHeader onClick={handleAddressCopy} className={'slug-header'}>
          {slug}
        </SlugHeader>
        {isCopied && <p>Copied</p>}
        {permissions.readContent && pinnedValues && (
          <PinnedList>
          {pinnedValues.map((props, index) => (
            <PinnedNote
              handleDelete={() => handleDeleteClicked(index)}
              updateContent={permissions.updateContent}
              key={index}
              {...props}
            />
          ))}
        </PinnedList>
        )}
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
