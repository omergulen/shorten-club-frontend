import React from "react";

import DeleteButton from './DeleteButton';
import Link from "./Link";
import PinnedItem from './PinnedItem';

const PinnedLink = ({ title, url, handleDelete }) => (
  <PinnedItem>
    <Link title={title} url={url} />
    <DeleteButton onClick={handleDelete}>
      X
    </DeleteButton>
  </PinnedItem>
);

export default PinnedLink;
