import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import PinnedLink from "./common/PinnedLink";
import PinnedList from "./common/PinnedList";
import SEO from "../components/seo";

import { getRecord, initialSlug, updateRecord } from "../api";

const Links = ({ id, location }) => {
  const [slug, setSlug] = useState('');
  const [bucketTitle, setBucketTitle] = useState('');
  const [bucketDescription, setBucketDescription] = useState('');
  const [pinValue, setPinValue] = useState('');
  const [pinTitle, setPinTitle] = useState('');
  const [pinnedValues, setPinnedValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState({
    readContent: true,
    updateContent: true
  });
  const [isCopied, setIsCopied] = useState(false);

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
      const res = await initialSlug('LINK');
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

  const handleUpdateRecord = (newPinnedValues) => {
    updateRecord(slug, {
      pins: newPinnedValues ? newPinnedValues : pinnedValues,
      title: bucketTitle,
      description: bucketDescription
    });
  }

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

      handleUpdateRecord(newPinnedValues);
    }
  };
  const handleDeleteClicked = (index) => {
    const array = [...pinnedValues]; // make a separate copy of the array
    array.splice(index, 1);
    setPinnedValues(array);
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
        <SlugHeader onClick={handleAddressCopy}  className={'slug-header'}>
          {slug}
        </SlugHeader>
        {isCopied && <p>Copied</p>}
        {permissions.readContent && pinnedValues && pinnedValues.length > 0 ? (
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
        {permissions.updateContent && (
          <>
            <PinInput
              autocomplete="off"
              autoFocus
              onChange={handlePinTitleValueChange}
              placeholder="Title"
              type="text"
              value={pinTitle}
            />
            <PinInput
              autocomplete="off"
              autoFocus
              placeholder="https://example.com"
              type="url"
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

