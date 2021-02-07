import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "@emotion/styled";

const _Link = ({ title, url }) => (
  <Link
    target="_blank"
    rel="noreferrer"
    href={url}
  >
    {title ? title : url}
  </Link>
);

const Link = styled(OutboundLink)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default _Link;
