import React from "react";
import styled from "@emotion/styled";

const Anchor = styled.a`
`;

const Link = ({ title, url }) => (
  <Anchor
    target="_blank"
    rel="noreferrer"
    href={url}
  >
    {title ? title : url}
  </Anchor>
);

export default Link;
