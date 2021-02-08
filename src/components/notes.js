import React, { useCallback, useEffect, useState } from "react";
import copy from 'copy-to-clipboard';

import Container from './common/Container';
import NameHeader from './common/NameHeader';
import NameSubHeader from './common/NameSubHeader';
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
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({
    readContent: true,
    updateContent: false
  });
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const _getRecord = async (id) => {
      const res = await getRecord(id);
      const { record: { content, slug }, permissions } = res.data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
      setLoading(false);
    }

    const _createRecord = async () => {
      const res = await initialSlug('NOTE');
      const { record: { content, slug }, permissions } = res.data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
      setLoading(false);
    }

    if (location && location.state && location.state.data) {
      const { record: { content, slug }, permissions } = location.state.data;
      setPermissions(permissions);
      setSlug(slug);
      setPinnedValues(content);
      setLoading(false);
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

  const handleAddressCopy = useCallback((event) => {
    const slug = event.target.innerText;
    const url = `https://shorten.club/${slug}`
    copy(url);
    setIsCopied(true);
    setTimeout(() => {
        setIsCopied(false);
    }, 1500);
  });

  const handlePinnedNoteTitleChange = (value, index) => {
    if (!value) { return; }
    const newPinnedValues = [...pinnedValues]; // make a separate copy of the newPinnedValues
    const pinAtIndex = {
      ...newPinnedValues[index],
      title: value,
    };
    newPinnedValues.splice(index, 1, pinAtIndex);
    setPinnedValues(newPinnedValues);
  };

  const handlePinnedNoteSave = (_, index) => {
    updateRecord(slug, pinnedValues);
  }

  const handlePinnedNoteBodyChange = (value, index) => {
    if (!value) { return; }
    const newPinnedValues = [...pinnedValues]; // make a separate copy of the newPinnedValues
    const pinAtIndex = {
      ...newPinnedValues[index],
      note: value,
    };
    newPinnedValues.splice(index, 1, pinAtIndex);
    setPinnedValues(newPinnedValues);
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
        <SlugHeader onClick={handleAddressCopy} className={'slug-header'}>
          {slug}
        </SlugHeader>
        {isCopied && <p>Copied</p>}
        {permissions.readContent && pinnedValues && pinnedValues.length > 0 ? (
          <PinnedList>
          {pinnedValues.map((props, index) => (
            <PinnedNote
              handleDelete={() => handleDeleteClicked(index)}
              handleBodyChange={(event) => handlePinnedNoteBodyChange(event, index)}
              handleTitleChange={(event) => handlePinnedNoteTitleChange(event, index)}
              handleNoteSave={(event) => handlePinnedNoteSave(event, index)}
              index={index}
              updateContent={permissions.updateContent}
              key={index}
              {...props}
            />
          ))}
        </PinnedList>
        ) : !permissions.updateContent && (
          <>
            <NameHeader>
              This bucket is currently empty...
            </NameHeader>
            <NameSubHeader>
              If this is not expected, contact to your PIN moderator.
            </NameSubHeader>
          </>
        )}
        {/* {permissions.readContent && !permissions.updateContent && pinnedValues && (
         
        )} */}
        {permissions.updateContent &&
        <>
          <PinInput
            autocomplete="off"
            autoFocus
            onChange={handlePinTitleValueChange}
            placeholder="Title"
            type="text"
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
        </>
        }
      </Container>
    </OuterContainer>
  );
}

export default Notes;
