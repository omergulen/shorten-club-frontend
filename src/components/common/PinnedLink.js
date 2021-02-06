import React from "react";

import DeleteButton from './DeleteButton';
import Link from "./Link";
import PinnedItem from './PinnedItem';

const PinnedLink = ({ title, url, handleDelete, updateContent }) => (
  <PinnedItem>
    <Link title={title} url={url} />
    {updateContent && (
      <DeleteButton onClick={handleDelete}>
        X
      </DeleteButton>
    )}
  </PinnedItem>
);

export default PinnedLink;
