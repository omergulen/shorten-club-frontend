import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Link = ({ title, url }) => (
  <OutboundLink
    target="_blank"
    rel="noreferrer"
    href={url}
  >
    {title ? title : url}
  </OutboundLink>
);

export default Link;
