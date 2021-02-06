import React, { useState, useEffect } from "react"

import Container from './common/Container';
import NameHeader from './common/NameHeader';
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
        <NameHeader>
          {slug}
        </NameHeader>
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
              name="pin-description"
              type="tel"
              placeholder="Title"
              id="description-input"
              className="sc-dlfnbm lflLbn"
              autocomplete="off"
              value={pinTitle}
              onChange={handlePinTitleValueChange}
              aria-expanded="false"
              autoFocus
            />
            <PinInput
              name="pin"
              type="tel"
              placeholder="https://example.com"
              id="pin-input"
              className="sc-dlfnbm lflLbn"
              autocomplete="off"
              value={pinValue}
              onChange={handlePinValueChange}
              aria-expanded="false"
              autoFocus
            />
            <PinButton
              className="enter-button__EnterButton-sc-1o9b9va-0 kfzgPK"
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

