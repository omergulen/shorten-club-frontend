import React, { useCallback, useEffect, useMemo,  useState } from "react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import copy from 'copy-to-clipboard';

import Container from './common/Container';
import NameHeader from './common/NameHeader';
import NameSubHeader from './common/NameSubHeader';
import EditableNameHeader from './common/EditableNameHeader';
import EditableNameSubHeader from './common/EditableNameSubHeader';
import SlugHeader from './common/SlugHeader';
import OuterContainer from './common/OuterContainer';
import PinButton from './common/PinButton';
import PinInput from './common/PinInput';
import PinnedList from './common/PinnedList';
import PinnedNote from './common/PinnedNote';
import PinTextarea from './common/PinTextarea';
import SEO from "../components/seo";

import { getRecord, initialSlug, updateRecord } from "../api";

const SortablePinnedItem = SortableElement((props) => (
  <PinnedNote
    {...props}
  />
));

const SortablePinnedList = SortableContainer(({
  handleDeleteClicked,
  handlePinnedNoteBodyChange,
  handlePinnedNoteTitleChange,
  handlePinnedNoteSave,
  permissions,
  pinnedValues,
}) => {
  return (
    <PinnedList>
      {pinnedValues.map((props, index) => (
        <SortablePinnedItem
          disabled={!permissions.updateContent}
          handleBodyChange={(event) => handlePinnedNoteBodyChange(event, index)}
          handleNoteSave={(event) => handlePinnedNoteSave(event, index)}
          handleTitleChange={(event) => handlePinnedNoteTitleChange(event, index)}
          handleDelete={() => handleDeleteClicked(index)}
          index={index}
          key={index}
          updateContent={permissions.updateContent}
          {...props}
        />
      ))}
    </PinnedList>
  );
});

const Notes = ({ id, location }) => {
  const [slug, setSlug] = useState('');
  const [bucketTitle, setBucketTitle] = useState('');
  const [bucketDescription, setBucketDescription] = useState('');
  const [pinNote, setPinNote] = useState('');
  const [pinTitle, setPinTitle] = useState('');
  const [pinnedValues, setPinnedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [permissions, setPermissions] = useState({
    readContent: true,
    updateContent: false
  });

  const seoTitle = useMemo(() => {
    return bucketTitle ? bucketTitle : "shorten.club";
  }, [bucketTitle]);

  const seoKeywords = useMemo(() => {
    if (bucketDescription) {
      const words = bucketDescription.match(/\b(\w+)\b/g);
      const wordsSet = new Set(words);
      const wordsArr = Array.from(wordsSet);
      return wordsArr;
    }

    return [`clubhouse`, `url`, `shortener`, 'resource', 'share'];
  }, [bucketDescription]);
  
  const handleInitialData = (data) => {
    const { record: { content, slug }, permissions } = data;
    setPermissions(permissions);
    setSlug(slug);
    if (Array.isArray(content)) {
      setPinnedValues(content);
    } else {
      if (Object.keys(content).length > 0) {
        const { pins, title, description } = content;
        setBucketTitle(title);
        setBucketDescription(description);
        setPinnedValues(pins);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    const _getRecord = async (id) => {
      const res = await getRecord(id);
      handleInitialData(res.data);
    }

    const _createRecord = async () => {
      const res = await initialSlug('NOTE');
      handleInitialData(res.data);
    }
    
    if (location && location.state && location.state.data) {
      handleInitialData(location.state.data);
    } else if (id) {
      _getRecord(id);
    } else {
      _createRecord();
    }
  }, [id]);

  const handleBucketTitleChange = (e) => {
    setBucketTitle(e);
  };

  const handleBucketDescriptionChange = (e) => {
    setBucketDescription(e);
  };

  const handleBucketTitleSave = ({ value }) => {
    handleUpdateRecord();
  };

  const handleBucketDescriptionSave = ({ value }) => {
    handleUpdateRecord();
  };

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
    handleUpdateRecord();
  }

  const handleUpdateRecord = (newPinnedValues) => {
    updateRecord(slug, {
      pins: newPinnedValues ? newPinnedValues : pinnedValues,
      title: bucketTitle,
      description: bucketDescription
    });
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

      handleUpdateRecord(newPinnedValues);
    }
  };

  const handleDeleteClicked = (index) => {
    const array = [...pinnedValues]; // make a separate copy of the array
    array.splice(index, 1);
    setPinnedValues(array);
  };

  const onSortEnd = ({oldIndex, newIndex}) => {
    const newPinnedValues = arrayMove(pinnedValues, oldIndex, newIndex);
    setPinnedValues(newPinnedValues);
    handleUpdateRecord(newPinnedValues);
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
        <SEO title={seoTitle} keywords={seoKeywords} />
        <EditableNameHeader
          onChange={handleBucketTitleChange}
          onSave={handleBucketTitleSave}
          readonly={!permissions.updateContent}
          value={bucketTitle}
          placeholder={permissions.updateContent ? 'Title' : ''}
        />
        <EditableNameSubHeader
          onChange={handleBucketDescriptionChange}
          onSave={handleBucketDescriptionSave}
          readonly={!permissions.updateContent}
          value={bucketDescription}
          placeholder={permissions.updateContent ? 'Description': ''}
        />
        <SlugHeader onClick={handleAddressCopy} className={'slug-header'}>
          {slug}
        </SlugHeader>
        {isCopied && <p>Copied</p>}
        {permissions.readContent && pinnedValues && pinnedValues.length > 0 ? (
          <SortablePinnedList
            handleDeleteClicked={handleDeleteClicked}
            handlePinnedNoteBodyChange={handlePinnedNoteBodyChange}
            handlePinnedNoteSave={handlePinnedNoteSave}
            handlePinnedNoteTitleChange={handlePinnedNoteTitleChange}
            lockAxis={'y'}
            permissions={permissions}
            pinnedValues={pinnedValues}
            onSortEnd={onSortEnd}
          />
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
